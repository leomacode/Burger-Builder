import React from "react";
import classes from "./backdrop.css";
const Backdrop = ({ showBackdrop, clickBackdrop }) => {
  return showBackdrop ? (
    <div className={classes.Backdrop} onClick={clickBackdrop} />
  ) : null;
};

export default Backdrop;
