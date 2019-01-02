import React from "react";
import BurgerIngredient from "./burgerIngredient/burgerIngredient";
import classes from "./burger.css";
const Burger = props => {
  const { ingredients } = props;

  const getIngredient = () => {
    let result = Object.keys(ingredients)
      .map(igKey =>
        [...Array(ingredients[igKey])].map((_, i) => (
          <BurgerIngredient key={igKey + i} type={igKey} />
        ))
      )
      .reduce((acc, cur) => {
        return acc.concat(cur);
      }, []);

    if (result.length === 0) {
      result = <p>Please add some ingredients</p>;
    }
    return result;
  };

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {getIngredient()}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
