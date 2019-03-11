import {
  GET_MY_ORDERS_SUCCESS,
  GET_ALL_USER_ORDERS_SUCCESS,
} from '../constants/order';
import { CLEAN_CACHE } from '../constants/global';

const INITIAL_STATE = {
  myOrders: {
    // Types
    event: [],
    workshop: [],
    printer: [],
  },
  allUserOrders: {},
}

export default function event(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: {
          ...state.myOrders,
          [action.payload.orderType]: action.payload.orders,
        },
      }
    case GET_ALL_USER_ORDERS_SUCCESS:
      return {
        ...state,
        allUserOrders: {
          ...state.allUserOrders,
          [action.payload.orderType]: action.payload.orders,
        }
      }
    case CLEAN_CACHE:
      return INITIAL_STATE;
    default:
      return state
  }
}
