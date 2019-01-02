import React from "react";
import NavigationItems from "../navigationItems/navigationItems";
import Logo from "../../logo/logo";
import classes from "./sideDrawer.css";
import Aux from "../../../hoc/aux";
import Backdrop from "../../UI/backdrop/backdrop";
const SideDrawer = ({ clickBackdrop, showBackdrop, isAuth }) => {
  return (
    <Aux>
      <Backdrop showBackdrop={showBackdrop} clickBackdrop={clickBackdrop} />
      <div className={getSideDrawerClass(showBackdrop)} onClick={clickBackdrop}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

const getSideDrawerClass = showBackdrop => {
  const SideDrawerClass = showBackdrop
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];
  return SideDrawerClass.join(" ");
};

export default SideDrawer;
