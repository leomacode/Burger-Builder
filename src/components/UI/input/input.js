import React from "react";
import classes from "./input.css";

const Input = props => {
  const getInput = () => {
    let inputElement = null;
    switch (props.elementType) {
      case "input":
        inputElement = (
          <input
            onChange={props.changeValue}
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
          />
        );
        break;
      case "select":
        inputElement = (
          <select
            onChange={props.changeValue}
            className={classes.InputElement}
            value={props.value}
          >
            {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        );
        break;
      case "textarea":
        inputElement = (
          <textarea
            onChange={props.changeValue}
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
          />
        );
        break;

      default:
        inputElement = (
          <input
            onChange={props.changeValue}
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
          />
        );
        break;
    }
    return inputElement;
  };

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {getInput()}
      {props.error && <div className={classes.Invalid}>{props.error}</div>}
    </div>
  );
};

export default Input;
