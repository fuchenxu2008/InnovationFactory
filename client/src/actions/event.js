import {
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  GET_ALL_EVENTS,
  GET_CACHED_EVENT,
  GET_EVENT,
} from '../constants/event';

import * as api from '../API/event'

export const getAllEvents = () => (dispatch) => {
  api.getAllEvents()
    .then(res => res.data)
    .then(data => {
      console.log(data);
      if (data.events) {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: data.events,
        })
      }
    })
    .catch(err => console.log(err))
  // throw error if occured
}

export const getEvent = (eventid) => (dispatch, getState) => {
  // Get local state cache
  // If has the event, read from cache else fetch from server
  const { allEvents } = getState().event;
  const cachedEvent = allEvents.filter(event => event._id === eventid)[0]
  if (cachedEvent) {
    dispatch({
      type: GET_CACHED_EVENT,
      payload: cachedEvent
    })
  } else {
    api.getEvent(eventid)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (data.event) {
          dispatch({
            type: GET_EVENT,
            payload: data.event,
          })
        }
      })
  }
}

/**
 * 
 * Admin actions
 */

export const addEvent = (event) => (dispatch) => {
  // begin loading
  // dispatch()
  // send request
  return api.addEvent(event)
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

export const updateEvent = (edition) => (dispatch) => {
  return api.updateEvent(edition)
    .then(res => typeof(res.data) === 'string' ? JSON.parse(res.data) : res.data)
    .then(data => {
      console.log(data);
      if (data.event) {
        dispatch({
          type: EDIT_EVENT,
          payload: data.event,
        })
      }
    })
    .catch(err => console.log(err))
}

export const deleteEvent = (eventid) => (dispatch) => {
  return api.deleteEvent(eventid)
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