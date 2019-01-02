import axios from "./../../axios-orders";

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_PRICE,
  REMOVE_PRICE,
  SAVE_INGREDIENTS,
  FETCH_FAILURE
} from "./actionTypes";

export const addIngredient = type => {
  return { type: ADD_INGREDIENT, ingredient: type };
};
export const removeIngredient = type => {
  return { type: REMOVE_INGREDIENT, ingredient: type };
};
export const addPrice = type => {
  return { type: ADD_PRICE, ingredient: type };
};
export const removePrice = type => {
  return { type: REMOVE_PRICE, ingredient: type };
};

export const saveIngredients = ingredientsData => {
  return { type: SAVE_INGREDIENTS, ingredientsData };
};

export const fetchFailure = () => {
  return { type: FETCH_FAILURE };
};

export const getIngredients = address => {
  return async dispatch => {
    try {
      const ingredients = await axios.get(address);
      dispatch(saveIngredients(ingredients.data));
    } catch (e) {
      dispatch(fetchFailure());
    }
  };
};
