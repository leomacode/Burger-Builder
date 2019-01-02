import React from "react";
import classes from "./navigationItem.css";
import { NavLink } from "react-router-dom";
const NivationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NivationItem;
