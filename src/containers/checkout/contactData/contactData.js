import React, { Component } from "react";
import Button from "../../../components/UI/button/button";
import classes from "./contactData.css";
import Spinner from "../../../components/UI/spinner/spinner";
import Input from "../../../components/UI/input/input";
import Joi from "joi-browser";
import { connect } from "react-redux";
import {
  purchaseStart,
  postData,
  resetPrice
} from "./../../../store/actions/index";
import errorHandler from "../../../hoc/errorHandler/errorHandler";
import axios from "./../../../axios-orders";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      postcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: ""
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        value: ""
      },
      delivery: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest"
      }
    },
    errors: {},
    disableButton: true
  };

  schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Name"),
    street: Joi.string()
      .min(5)
      .required()
      .label("Street"),
    country: Joi.string()
      .min(2)
      .required()
      .label("Country"),
    postcode: Joi.string()
      .min(6)
      .required()
      .label("Postcode"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    delivery: Joi.string().required()
  };

  validateForm = () => {
    const formData = this.getFormData();
    const validationForm = {};
    for (let identifier in formData) {
      validationForm[identifier] = formData[identifier].value;
    }

    const errors = {};
    const option = { abortEarly: false };
    const { error } = Joi.validate(validationForm, this.schema, option);

    if (!error) return null;
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = (value, id) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error && error.details[0].message;
  };

  getFormData = () => {
    const formData = {};
    for (let elementIdentifier in this.state.orderForm) {
      formData[elementIdentifier] = this.state.orderForm[elementIdentifier];
    }
    return formData;
  };

  getElementsArray = () => {
    const formElements = [];
    const orderForm = { ...this.state.orderForm };
    for (let key in orderForm) {
      formElements.push({
        id: key,
        config: orderForm[key]
      });
    }
    return formElements;
  };

  handleOrder = async e => {
    e.preventDefault();
    this.props.purchaseStart();

    const errors = this.validateForm();
    await this.setState({ errors: errors || {} });

    if (Object.keys(this.state.errors).length) return;

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.totalPrice,
      orderData: this.getFormData(),
      userId: this.props.userId
    };
    const token = this.props.token;
    const result = this.props.postData(order, token);
    if (result) {
      this.props.resetPrice();
    }
  };

  handleValueChange = (e, id) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target.value, id);
    if (errorMessage) errors[id] = errorMessage;
    else delete errors[id];

    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[id]
    };
    updatedFormElement.value = e.target.value;
    updatedOrderForm[id] = updatedFormElement;

    this.setState({
      orderForm: updatedOrderForm,
      errors
    });
  };

  render() {
    return this.props.order.loading ? (
      <Spinner />
    ) : (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        <form onSubmit={this.handleOrder}>
          {this.getElementsArray().map(element => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.value}
              changeValue={e => this.handleValueChange(e, element.id)}
              error={this.state.errors[element.id]}
            />
          ))}
          <Button disableButton={this.validateForm()} btnType="Success">
            Order
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    order: state.order,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    purchaseStart: () => dispatch(purchaseStart()),
    postData: (order, token) => dispatch(postData(order, token)),
    resetPrice: () => dispatch(resetPrice())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(ContactData, axios));
