import React, { Component } from "react";
import classes from "./layout.css";
import Aux from "../aux";
import Toolbar from "../../components/navigation/toolbar/toolbar";
import SideDrawer from "../../components/navigation/sideDrawer/sideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showBackdrop: false
  };

  handleClickingBackdrop = () => {
    this.setState({ showBackdrop: false });
  };

  handleMenu = () => {
    this.setState({ showBackdrop: true });
  };

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuth} openMenu={this.handleMenu} />
        <SideDrawer
          isAuth={this.props.isAuth}
          showBackdrop={this.state.showBackdrop}
          clickBackdrop={this.handleClickingBackdrop}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};
export default connect(mapStateToProps)(Layout);
