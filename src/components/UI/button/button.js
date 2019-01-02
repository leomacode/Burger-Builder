import React from "react";
import classes from "./button.css";
const Button = props => {
  return (
    <button
      disabled={props.disableButton}
      onClick={props.clickButton}
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
