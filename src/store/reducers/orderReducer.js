import {
  PURCHASE_SUCCESS,
  PURCHASE_FAIL,
  PURCHASE_START,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ORDER_UNPURCHASED
} from "./../actions/actionTypes";
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const orderReducer = (state = initialState, { type, orders }) => {
  switch (type) {
    case PURCHASE_START:
      return {
        ...state,
        loading: true
      };
    case PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true
      };
    case PURCHASE_FAIL:
      return {
        ...state,
        loading: false
      };
    case FETCH_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        orders: [...orders],
        loading: false
      };
    case FETCH_FAIL:
      return {
        ...state,
        loading: false
      };
    case ORDER_UNPURCHASED:
      return {
        ...state,
        purchased: false
      };
    default:
      return state;
  }
};

export default orderReducer;
