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
    .then(({ data }) => {
      console.log(data);
      if (data.events && data.categories) {
        dispatch({
          type: GET_ALL_EVENTS,
          payload: {
            events: data.events.sort((a, b) => {
              return new Date(b.created_at.replace(/-/g, '/')) - new Date(a.created_at.replace(/-/g, '/'));
            }),
            categories: data.categories,
          }
        })
      }
    })
    .catch(err => console.log(err))
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
      .then(({ data }) => {
        console.log(data);
        if (data.event) {
          dispatch({
            type: GET_EVENT,
            payload: data.event,
          })
        }
      })
      .catch(err => console.log(err))
  }
}

/**
 * 
 * Admin actions
 *
 * Need token to authenticate
 */

export const addEvent = (event) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.addEvent(event, token)
    .then(({ data }) => {
      console.log(data);
      if (data.event) {
        dispatch({
          type: ADD_EVENT,
          payload: data.event,
        })
      }
    })
    .catch(err => console.log(err))
}

export const updateEvent = (edition) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.updateEvent(edition, token)
    .then(({ data }) => {
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

export const deleteEvent = (eventid) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.deleteEvent(eventid, token)
    .then(({ data }) => {
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