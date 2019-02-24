import {
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  GET_INITIAL_EVENTS,
  GET_PAGINATED_EVENTS,
  GET_EVENT,
} from '../constants/event';

import * as api from '../API/event'

export const getInitialEvents = () => (dispatch) => {
  return api.getInitialEvents()
    .then(({ data }) => {
      console.log(data);
      if (data.events && data.categories) {
        dispatch({
          type: GET_INITIAL_EVENTS,
          payload: {
            events: data.events,
            categories: data.categories,
          }
        })
      }
    })
    .catch(err => console.log(err))
}

export const getPaginatedEvents = ({ start, category }) => (dispatch) => {
  return api.getPaginatedEvents({ start, category })
    .then(({ data }) => {
      console.log(data);
      if (data.events) {
        dispatch({
          type: GET_PAGINATED_EVENTS,
          payload: {
            events: data.events,
            category,
          }
        })
      }
    })
    .catch(err => console.log(err))
}

export const getEvent = (eventid) => (dispatch) => {
  return api.getEvent(eventid)
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
        const category = (data.event.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: ADD_EVENT,
          payload: {
            event: data.event,
            category,
          }
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
        const category = (data.event.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: EDIT_EVENT,
          payload: {
            event: data.event,
            category,
          }
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
        const category = (data.event.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: DELETE_EVENT,
          payload: {
            event: data.event,
            category,
          }
        })
      }
    })
    .catch(err => console.log(err))
}