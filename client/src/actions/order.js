import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAILURE,
  GET_MY_ORDER_REQUEST,
  GET_MY_ORDER_SUCCESS,
  GET_MY_ORDER_FAILURE,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAILURE,
  CANCEL_MY_ORDER_REQUEST,
  CANCEL_MY_ORDER_SUCCESS,
  CANCEL_MY_ORDER_FAILURE,
  GET_ALL_USER_ORDERS_REQUEST,
  GET_ALL_USER_ORDERS_SUCCESS,
  GET_ALL_USER_ORDERS_FAILURE,
} from '../constants/order';
import * as api from '../API/order';

/**
 * Need token to authenticate
 */
export const submitOrder = ({order, type}) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: SUBMIT_ORDER_REQUEST
  });
  return api.submitOrder({order, type}, token)
    .then(({ data }) => {
      console.log(data);
      if (data.order) {
        dispatch({
          type: SUBMIT_ORDER_SUCCESS,
          payload: data.order,
        })
      }
    })
    .catch(err => {
      dispatch({
        type: SUBMIT_ORDER_FAILURE,
        payload: err,
      })
    })
}

/**
 * Need token to authenticate
 */
export const getMyOrder = ({ type, id }) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: GET_MY_ORDER_REQUEST
  });
  return api.getMyOrder({ type, id }, token)
    .then(({ data }) => {
      console.log(data);
      if (data.order) {
        dispatch({
          type: GET_MY_ORDER_SUCCESS,
          payload: data.order,
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_MY_ORDER_FAILURE,
        payload: err,
      })
    })
}

/**
 * Need token to authenticate
 */
export const getMyOrders = (type) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: GET_MY_ORDERS_REQUEST
  });
  return api.getMyOrders(type, token)
    .then(({ data }) => {
      console.log(data);
      if (data.myOrders) {
        dispatch({
          type: GET_MY_ORDERS_SUCCESS,
          payload: {
            orderType: type,
            orders: data.myOrders,
          },
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_MY_ORDERS_FAILURE,
        payload: err,
      })
    })
}

/**
 * Need token to authenticate
 */
export const cancelMyOrder = ({ type, id }) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: CANCEL_MY_ORDER_REQUEST
  });
  return api.cancelMyOrder({ type, id }, token)
    .then(({ data }) => {
      console.log(data);
      if (data.order) {
        dispatch({
          type: CANCEL_MY_ORDER_SUCCESS,
          payload: {
            orderType: type,
            order: data.order,
          },
        })
      }
    })
    .catch(err => {
      dispatch({
        type: CANCEL_MY_ORDER_FAILURE,
        payload: err,
      })
    })
}

/**
 * Admin functions
 *
 * Need admin token
 */
export const getAllUserOrders = (type) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: GET_ALL_USER_ORDERS_REQUEST,
  });
  return api.getAllUserOrders(type, token)
    .then(({ data }) => {
      console.log('data: ', data);
      if (data.orders) {
        dispatch({
          type: GET_ALL_USER_ORDERS_SUCCESS,
          payload: {
            orderType: type,
            orders: data.orders,
          }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_USER_ORDERS_FAILURE,
        payload: err,
      })
    })
}
