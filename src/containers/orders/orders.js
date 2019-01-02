import React, { Component } from "react";
import Order from "../../components/order/order";
import axios from "./../../axios-orders";
import errorHandler from "../../hoc/errorHandler/errorHandler";
import { connect } from "react-redux";
import {
  fetchData,
  fetchStart,
  checkLoginStatus
} from "./../../store/actions/index";
import Spinner from "../../components/UI/spinner/spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.token, this.props.userId);
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (token, userId) => dispatch(fetchData(token, userId)),
    fetchStart: () => dispatch(fetchStart()),
    checkLoginStatus: () => dispatch(checkLoginStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Orders, axios));
