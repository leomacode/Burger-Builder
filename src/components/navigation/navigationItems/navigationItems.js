import React from "react";
import NivationItem from "./navigationItem/navigationItem";
import classes from "./navigationItems.css";
const NavigationItems = ({ isAuth }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NivationItem link="/" exact>
        Burger Builder
      </NivationItem>
      {isAuth && <NivationItem link="/orders">Orders</NivationItem>}
      {isAuth ? (
        <NivationItem link="/logout">Log Out</NivationItem>
      ) : (
        <NivationItem link="/auth">Authentication</NivationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
