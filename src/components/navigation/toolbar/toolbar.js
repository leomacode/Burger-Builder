import React from "react";
import classes from "./toolbar.css";
import Logo from "../../logo/logo";
import NavigationItems from "../navigationItems/navigationItems";
import Menu from "../sideDrawer/menu/menu";

const Toolbar = ({ openMenu, isAuth }) => {
  return (
    <header className={classes.Toolbar}>
      <Menu openMenu={openMenu} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
