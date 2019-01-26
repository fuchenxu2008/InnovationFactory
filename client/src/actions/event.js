import {
  ADD_EVENT,
  DELETE_EVENT,
  // EDIT_EVENT,
  GET_ALL_EVENTS,
} from '../constants/event';

import * as api from '../API/event'

export const getAllEvents = () => (dispatch) => {
  api.getAllEvents()
    .then(res => res.data)
    .then(data => {
      console.log(data);
      if (data) {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: data,
        })
      }
    })
    .catch(err => console.log(err))
  // throw error if occured
}

export const addEvent = (event) => (dispatch) => {
  // begin loading
  // dispatch()
  // send request
  api.addEvent(event)
    .then(res => JSON.parse(res.data))
    .then(data => {
      console.log(data);
      if (data.event) {
        dispatch({
          type: ADD_EVENT,
          payload: data.event,
        })
      }
    })
    .catch(err => console.log(err))
  // throw error if occured
}

export const deleteEvent = (eventid) => (dispatch) => {
  api.deleteEvent(eventid)
    .then(res => res.data)
    .then(data => {
      console.log(data);
      if (data.event) {
        dispatch({
          type: DELETE_EVENT,
          payload: data.event,
        })
      }
    })
    .catch(err => console.log(err))
}
