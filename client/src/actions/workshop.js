import {
  ADD_WORKSHOP,
  DELETE_WORKSHOP,
  EDIT_WORKSHOP,
  GET_ALL_WORKSHOPS,
  GET_CACHED_WORKSHOP,
  GET_WORKSHOP,
} from '../constants/workshop';

import * as api from '../API/workshop'

export const getAllWorkshops = () => (dispatch) => {
  api.getAllWorkshops()
    .then(({ data }) => {
      console.log(data);
      if (data.workshops && data.categories) {
        dispatch({
          type: GET_ALL_WORKSHOPS,
          payload: {
            workshops: data.workshops.sort((a, b) => {
              return new Date(b.created_at.replace(/-/g, '/')) - new Date(a.created_at.replace(/-/g, '/'));
            }),
            categories: data.categories,
          }
        })
      }
    })
    .catch(err => console.log(err))
}

export const getWorkshop = (workshopid) => (dispatch, getState) => {
  // Get local state cache
  // If has the workshop, read from cache else fetch from server
  const { allWorkshops } = getState().workshop;
  const cachedWorkshop = allWorkshops.filter(workshop => workshop._id === workshopid)[0]
  if (cachedWorkshop) {
    dispatch({
      type: GET_CACHED_WORKSHOP,
      payload: cachedWorkshop
    })
  } else {
    api.getWorkshop(workshopid)
      .then(({ data }) => {
        console.log(data);
        if (data.workshop) {
          dispatch({
            type: GET_WORKSHOP,
            payload: data.workshop,
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

export const addWorkshop = (workshop) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.addWorkshop(workshop, token)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        dispatch({
          type: ADD_WORKSHOP,
          payload: data.workshop,
        })
      }
    })
    .catch(err => console.log(err))
}

export const updateWorkshop = (edition) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.updateWorkshop(edition, token)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        dispatch({
          type: EDIT_WORKSHOP,
          payload: data.workshop,
        })
      }
    })
    .catch(err => console.log(err))
}

export const deleteWorkshop = (workshopid) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.deleteWorkshop(workshopid, token)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        dispatch({
          type: DELETE_WORKSHOP,
          payload: data.workshop,
        })
      }
    })
    .catch(err => console.log(err))
}