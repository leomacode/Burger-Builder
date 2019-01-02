import React from "react";
import classes from "./menu.css";
const Menu = ({ openMenu }) => {
  return (
    <div className={classes.Menu} onClick={openMenu}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default Menu;
