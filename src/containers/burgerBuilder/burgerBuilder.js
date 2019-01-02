import React, { Component } from "react";
import Aux from "../../hoc/aux";
import Burger from "../../components/burger/burger";
import BuildControls from "../../components/burger/buildControls/buildControls";
import Modal from "../../components/UI/modal/modal";
import OrderSummary from "../../components/orderSummary/orderSummary";
import axios from "./../../axios-orders";
import errorHandler from "../../hoc/errorHandler/errorHandler";
import Spinner from "../../components/UI/spinner/spinner";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  addPrice,
  removePrice,
  getIngredients,
  initialOrder,
  setRedirectPath
} from "../../store/actions/index";

export class Burgerbuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    this.props.initialOrder();
    this.props.getIngredients(
      "https://react-my-burger-7f88f.firebaseio.com/ingredients.json"
    );
  }

  handleAdding = type => {
    this.props.addIngredient(type);
    this.props.addPrice(type);
  };

  handleDeleting = type => {
    if (this.props.ingredients[type] > 0) {
      this.props.removeIngredient(type);
      this.props.removePrice(type);
    }
  };

  handleDisableButton = type => {
    return this.props.ingredients[type] === 0;
  };

  handleDisableOrderButton = () => {
    const ingredients = { ...this.props.ingredients };
    const totalAmount = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((acc, crv) => acc + crv, 0);
    return totalAmount === 0;
  };

  handlePurchasing = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
      this.props.setRedirectPath("/checkout");
    }
  };

  handleClickBackdrop = () => {
    this.setState({ purchasing: false });
  };

  handleContinuePurchasing = async () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  handleBurgerandBuildControls = () => {
    return this.props.ingredients ? (
      <div>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          addIngredient={this.handleAdding}
          deleteIngredient={this.handleDeleting}
          disableButton={this.handleDisableButton}
          price={Math.abs(this.props.totalPrice.totalPrice).toFixed(2)}
          disableOrderButton={this.handleDisableOrderButton()}
          onPurchasing={this.handlePurchasing}
          isAuth={this.props.isAuth}
        />
      </div>
    ) : (
      <Spinner />
    );
  };

  render() {
    return (
      <Aux>
        <Modal
          order={this.state.purchasing}
          clickBackdrop={this.handleClickBackdrop}
        >
          <OrderSummary
            price={Math.abs(this.props.totalPrice.totalPrice).toFixed(2)}
            ingredients={this.props.ingredients}
            cancelPurchasing={this.handleClickBackdrop}
            continuePurchasing={this.handleContinuePurchasing}
            loading={this.state.loading}
          />
        </Modal>
        {this.props.error ? (
          <p style={{ textAlign: "center" }}>NOTHING AVAILABLE</p>
        ) : (
          this.handleBurgerandBuildControls()
        )}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.ingredients,
    error: state.ingredients.error,
    totalPrice: state.totalPrice,
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: type => dispatch(addIngredient(type)),
    removeIngredient: type => dispatch(removeIngredient(type)),
    addPrice: type => dispatch(addPrice(type)),
    removePrice: type => dispatch(removePrice(type)),
    getIngredients: address => dispatch(getIngredients(address)),
    initialOrder: () => dispatch(initialOrder()),
    setRedirectPath: path => dispatch(setRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Burgerbuilder, axios));
