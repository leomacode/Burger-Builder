import React, { Component } from "react";
import Aux from "../../hoc/aux";
import Button from "../UI/button/button";
import Spinner from "../UI/spinner/spinner";

class OrderSummary extends Component {
  getList = ingredients => {
    return Object.keys(ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}:</span>
        {ingredients[igKey]}
      </li>
    ));
  };

  getLoading = () => {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>{this.getList(this.props.ingredients)}</ul>
        <p>
          <strong>Price: {this.props.price}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clickButton={this.props.cancelPurchasing}>
          CENCEL
        </Button>
        <Button btnType="Success" clickButton={this.props.continuePurchasing}>
          CONTINUE
        </Button>
      </Aux>
    );
  };

  render() {
    return this.props.ingredients ? this.getLoading() : <Spinner />;
  }
}

export default OrderSummary;
