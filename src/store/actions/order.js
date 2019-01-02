import axios from "./../../axios-orders";
import {
  PURCHASE_SUCCESS,
  PURCHASE_START,
  PURCHASE_FAIL,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ORDER_UNPURCHASED
} from "./actionTypes";

export const purchaseStart = () => {
  return { type: PURCHASE_START };
};

export const purchaseSuccess = (order, id) => {
  return { type: PURCHASE_SUCCESS, order, id };
};
export const purchaseFail = () => {
  return { type: PURCHASE_FAIL };
};

export const postData = (order, token) => {
  return async dispatch => {
    try {
      const response = await axios.post(`orders.json?auth=${token}`, order);
      const { name: id } = response.data;
      if (response.status === 200) dispatch(purchaseSuccess(order, id));
    } catch (error) {
      dispatch(purchaseFail());
    }
  };
};

export const fetchStart = () => {
  return { type: FETCH_START };
};

export const fetchSuccess = orders => {
  return { type: FETCH_SUCCESS, orders };
};

export const fetchFail = () => {
  return { type: FETCH_FAIL };
};

export const fetchData = (token, userId) => {
  const queryParams = `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  return async dispatch => {
    try {
      const response = await axios.get(queryParams);
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }
      dispatch(fetchSuccess(fetchedOrders));
    } catch (e) {
      console.log(e);
      dispatch(fetchFail());
    }
  };
};

export const initialOrder = () => {
  return {
    type: ORDER_UNPURCHASED
  };
};
