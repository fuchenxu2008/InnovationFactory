import {
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
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
    .catch(err => console.log(err))
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
            orders: data.myOrders.sort((a, b) => {
              return new Date(b.created_at.replace(/-/g, '/')) - new Date(a.created_at.replace(/-/g, '/'));
            })
          },
        })
      }
    })
    .catch(err => console.log(err))
}
