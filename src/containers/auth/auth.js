import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../../components/UI/input/input";
import Button from "../../components/UI/button/button";
import { connect } from "react-redux";
import classes from "./auth.css";
import { onAuth, setRedirectPath } from "../../store/actions/index";
import Spinner from "../../components/UI/spinner/spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: ""
      }
    },
    errors: {},
    disableButton: true,
    isSignup: false
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(8)
      .required()
      .label("Password")
  };

  componentDidMount() {
    if (!this.props.building) this.props.setRedirectPath();
  }

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
    for (let elementIdentifier in this.state.authForm) {
      formData[elementIdentifier] = this.state.authForm[elementIdentifier];
    }
    return formData;
  };

  getElementsArray = () => {
    const formElements = [];
    const authForm = { ...this.state.authForm };
    for (let key in authForm) {
      formElements.push({
        id: key,
        config: authForm[key]
      });
    }

    return formElements;
  };

  handleOrder = async e => {
    e.preventDefault();

    const errors = this.validateForm();
    await this.setState({ errors: errors || {} });

    if (Object.keys(this.state.errors).length) return;

    const { email, password } = this.state.authForm;
    this.props.onAuth(email.value, password.value, this.state.isSignup);
  };

  handleValueChange = (e, id) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target.value, id);
    if (errorMessage) errors[id] = errorMessage;
    else delete errors[id];

    const updatedAuthForm = {
      ...this.state.authForm
    };
    const updatedFormElement = {
      ...updatedAuthForm[id]
    };
    updatedFormElement.value = e.target.value;
    updatedAuthForm[id] = updatedFormElement;

    this.setState({
      authForm: updatedAuthForm,
      errors
    });
  };

  switchButtonMode = () => {
    this.setState(preState => {
      return { isSignup: !preState.isSignup };
    });
  };

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.Auth}>
        <form onSubmit={this.handleOrder}>
          {this.props.isAuth ? <Redirect to={this.props.redirectPath} /> : null}
          {this.props.error ? <p>{this.props.error}</p> : null}
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
            Submit
          </Button>
        </form>
        <Button clickButton={this.switchButtonMode} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGNUP" : "SIGNIN"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.isAuth,
    redirectPath: state.auth.redirectPath,
    building: state.ingredients.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(onAuth(email, password, isSignup)),
    setRedirectPath: () => dispatch(setRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
