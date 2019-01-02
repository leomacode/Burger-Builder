import * as actionTypes from "../actions/actionTypes";
import { updeatedObject } from "../../utility/updateObject";
const initialState = {
  totalPrice: 0
};

const ingredientPrices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6
};

const { ADD_PRICE, REMOVE_PRICE, RESET_PRICE, ORDER_UNPURCHASED } = actionTypes;

const totalPriceReducer = (state = initialState, { type, ingredient }) => {
  switch (type) {
    case ADD_PRICE:
      return updeatedObject(state, {
        totalPrice: state.totalPrice + ingredientPrices[ingredient]
      });

    case REMOVE_PRICE:
      return updeatedObject(state, {
        totalPrice: state.totalPrice - ingredientPrices[ingredient]
      });

    case RESET_PRICE:
      return updeatedObject(state, {
        totalPrice: 0
      });
    case ORDER_UNPURCHASED:
      return updeatedObject(state, {
        totalPrice: 0
      });

    default:
      return state;
  }
};

export default totalPriceReducer;
