import {
  SUBMIT_EVENT_ORDER,
  GET_MY_ORDERS,
} from '../constants/order';
import * as api from '../API/order';

export const submitEventOrder = (order) => (dispatch) => {
  return api.submitEventOrder(order)
    .then(res => res.data)
    .then(data => {
      console.log(data);
      if (data.eventOrder) {
        dispatch({
          type: SUBMIT_EVENT_ORDER,
          payload: data.eventOrder,
        })
      }
    })
}

export const getMyOrders = (type, openid) => (dispatch) => {
  return api.getMyOrders(type, openid)
    .then(res => res.data)
    .then(data => {
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
