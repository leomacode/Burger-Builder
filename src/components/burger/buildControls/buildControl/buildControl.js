import React from "react";
import classes from "./buildControl.css";

const BuildControl = ({
  label,
  addIngredient,
  deleteIngredient,
  disableButton
}) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.More} onClick={addIngredient}>
        More
      </button>
      <button
        className={classes.Less}
        onClick={deleteIngredient}
        disabled={disableButton()}
      >
        Less
      </button>
    </div>
  );
};

export default BuildControl;
