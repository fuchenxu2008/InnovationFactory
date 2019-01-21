import {
  ADD_EVENT,
  DELETE_EVENT,
  // EDIT_EVENT
} from '../constants/event';

import * as api from '../API/event'

export const addEvent = (event) => (dispatch) => {
  // begin loading
  // dispatch()
  // send request
  api.addEvent(event)
    .then(res => dispatch({
      type: ADD_EVENT,
      payload: res.data,
    }))
  // throw error if occured
}

export const deleteEvent = () => {
  return {
    type: DELETE_EVENT
  }
}

// // 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
