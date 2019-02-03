import {
  GET_MY_ORDERS,
} from '../constants/order';

const INITIAL_STATE = {
  myOrders: {
    // Types
    event: [],
    workshop: [],
    printer: [],
  },
}

export default function event(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MY_ORDERS:
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          [action.payload.orderType]: action.payload.orders,
        },
      }
    default:
      return state
  }
}
