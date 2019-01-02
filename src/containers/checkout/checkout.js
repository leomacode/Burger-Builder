import React, { Component } from "react";
import CheckoutSummary from "../../components/order/checkoutSummary/checkoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./contactData/contactData";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  handleCancel = () => {
    this.props.history.goBack();
  };

  handleContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  getRedirect = () => {
    if (this.props.orderPurchased) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          clickAndCancel={this.handleCancel}
          clickAndContinue={this.handleContinue}
        />

        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  };

  render() {
    return this.props.ingredients ? this.getRedirect() : <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.ingredients,
    orderPurchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
