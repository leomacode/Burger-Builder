import * as actionTypes from "../actions/actionTypes";
// import { updeatedObject } from "../../utility/updateObject";

const initialState = {
  ingredients: null,
  error: false,
  building: false
};
const {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SAVE_INGREDIENTS,
  FETCH_FAILURE
} = actionTypes;

const ingredientsReducer = (
  state = initialState,
  { type, ingredient, ingredientsData }
) => {
  switch (type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,
          [ingredient]: state.ingredients[ingredient] + 1
        }
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        building: true,
        ingredients: {
          ...state.ingredients,
          [ingredient]: state.ingredients[ingredient] - 1
        }
      };
    case SAVE_INGREDIENTS:
      return {
        ...state,
        ingredients: ingredientsData,
        error: false,
        building: false
      };

    case FETCH_FAILURE:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default ingredientsReducer;
