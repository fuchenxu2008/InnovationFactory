import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  GET_INITIAL_EVENTS_REQUEST,
  GET_INITIAL_EVENTS_SUCCESS,
  GET_PAGINATED_EVENTS_REQUEST,
  GET_PAGINATED_EVENTS_SUCCESS,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
} from '../constants/event';

import * as api from '../API/event'

export const getInitialEvents = () => (dispatch) => {
  dispatch({
    type: GET_INITIAL_EVENTS_REQUEST
  });
  return api.getInitialEvents()
    .then(({ data }) => {
      console.log(data);
      if (data.events && data.categories) {
        dispatch({
          type: GET_INITIAL_EVENTS_SUCCESS,
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
  dispatch({
    type: GET_PAGINATED_EVENTS_REQUEST
  });
  return api.getPaginatedEvents({ start, category })
    .then(({ data }) => {
      console.log(data);
      if (data.events) {
        dispatch({
          type: GET_PAGINATED_EVENTS_SUCCESS,
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
  dispatch({
    type: GET_EVENT_REQUEST
  });
  return api.getEvent(eventid)
    .then(({ data }) => {
      console.log(data);
      if (data.event) {
        dispatch({
          type: GET_EVENT_SUCCESS,
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
  dispatch({
    type: ADD_EVENT_REQUEST
  });
  return api.addEvent(event, token)
    .then(({ data }) => {
      console.log(data);
      if (data.event) {
        const category = (data.event.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: ADD_EVENT_SUCCESS,
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
  dispatch({
    type: EDIT_EVENT_REQUEST
  });
  return api.updateEvent(edition, token)
    .then(({ data }) => {
      console.log(data);
      if (data.event) {
        const category = (data.event.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: EDIT_EVENT_SUCCESS,
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
  dispatch({
    type: DELETE_EVENT_REQUEST
  });
  return api.deleteEvent(eventid, token)
    .then(({ data }) => {
      console.log(data);
      if (data.event) {
        const category = (data.event.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: DELETE_EVENT_SUCCESS,
          payload: {
            event: data.event,
            category,
          }
        })
      }
    })
    .catch(err => console.log(err))
}