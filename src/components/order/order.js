import React from "react";
import classes from "./order.css";
const Order = ({ ingredients, price }) => {
  const getIngredients = ingredients => {
    const igArray = [];
    for (let ig in ingredients) {
      igArray.push({
        name: ig,
        amount: ingredients[ig]
      });
    }
    return igArray.map(ig => (
      <span key={ig.name}>
        {ig.name}: ({ig.amount})
      </span>
    ));
  };
  return (
    <div className={classes.Order}>
      <p>Ingredients: {getIngredients(ingredients)}</p>
      <p>
        Price: <strong>{price}USD</strong>
      </p>
    </div>
  );
};

export default Order;
