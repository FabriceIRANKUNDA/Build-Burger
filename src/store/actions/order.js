import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSucess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());
    try {
      const res = await axios({
        method: "POST",
        url: "/orders.json?auth=" + token,
        data: orderData,
      });
      dispatch(purchaseBurgerSucess(res.data.name, res.data));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.ACTION_ON_ORDERS_START,
  };
};

const fetchOrdersSuccessed = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

const fetchOrdersFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const fetchOrders = token => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    try {
      const res = await axios({
        url: "/orders.json?auth=" + token,
        method: "Get",
      });
      const fetchedData = [];
      for (let key in res.data) {
        fetchedData.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccessed(fetchedData));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};

const deleteOrderAction = id => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    id,
  };
};

export const deleteOrder = (id, token) => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    try {
      await axios({
        method: "DELETE",
        url: `/orders/${id}.json?auth=${token}`,
      });
      dispatch(deleteOrderAction(id));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};
