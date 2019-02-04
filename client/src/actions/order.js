import {
  SUBMIT_EVENT_ORDER,
  GET_MY_ORDERS,
} from '../constants/order';
import * as api from '../API/order';

/**
 * Need token to authenticate
 */
export const submitEventOrder = (order) => (dispatch, getState) => {
  const { currentUser } = getState().global;
  if (!currentUser) return console.log('Requires user login');
  return api.submitEventOrder(order, currentUser.token)
    .then(({data}) => {
      console.log(data);
      if (data.eventOrder) {
        dispatch({
          type: SUBMIT_EVENT_ORDER,
          payload: data.eventOrder,
        })
      }
    })
}

/**
 * Need token to authenticate
 */
export const getMyOrders = (type) => (dispatch, getState) => {
  const { currentUser } = getState().global;
  if (!currentUser) return console.log('Requires user login');
  return api.getMyOrders(type, currentUser.token)
    .then(({data}) => {
      console.log(data);
      if (data.myOrders) {
        dispatch({
          type: GET_MY_ORDERS,
          payload: {
            orderType: type,
            orders: data.myOrders
          },
        })
      }
    })
}
