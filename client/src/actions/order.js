import {
  SUBMIT_EVENT_ORDER,
  GET_MY_ORDERS,
} from '../constants/order';
import * as api from '../API/order';

/**
 * Need token to authenticate
 */
export const submitEventOrder = (order) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.submitEventOrder(order, token)
    .then(({ data }) => {
      console.log(data);
      if (data.eventOrder) {
        dispatch({
          type: SUBMIT_EVENT_ORDER,
          payload: data.eventOrder,
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
  return api.getMyOrders(type, token)
    .then(({ data }) => {
      console.log(data);
      if (data.myOrders) {
        dispatch({
          type: GET_MY_ORDERS,
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
