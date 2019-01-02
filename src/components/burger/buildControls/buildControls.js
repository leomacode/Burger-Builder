import React from "react";
import classes from "./buildControls.css";
import BuildControl from "./buildControl/buildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = ({
  price,
  deleteIngredient,
  disableButton,
  disableOrderButton,
  onPurchasing,
  addIngredient,
  isAuth
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addIngredient={() => addIngredient(ctrl.type)}
          deleteIngredient={() => deleteIngredient(ctrl.type)}
          disableButton={() => disableButton(ctrl.type)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={disableOrderButton}
        onClick={onPurchasing}
      >
        {isAuth ? "ORDER NOW" : "Signup to order"}
      </button>
    </div>
  );
};

export default BuildControls;
