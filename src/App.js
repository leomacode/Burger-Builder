import React, { Component } from "react";
import Burgerbuilder from "./containers/burgerBuilder/burgerBuilder";
import Layout from "./hoc/layout/layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Checkout from "./containers/checkout/checkout";
import Orders from "./containers/orders/orders";
import Auth from "./containers/auth/auth";
import Logout from "./containers/auth/logout/logout";
import { checkLoginStatus } from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount = () => {
    this.props.checkLoginStatus();
  };

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuth && <Route path="/orders" component={Orders} />}
            {this.props.isAuth && (
              <Route path="/checkout" component={Checkout} />
            )}
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Burgerbuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLoginStatus: () => dispatch(checkLoginStatus())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
