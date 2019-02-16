import {
  ADD_WORKSHOP,
  DELETE_WORKSHOP,
  EDIT_WORKSHOP,
  GET_INITIAL_WORKSHOPS,
  GET_WORKSHOP,
} from '../constants/workshop';

import * as api from '../API/workshop'

export const getInitialWorkshops = () => (dispatch) => {
  api.getInitialWorkshops()
    .then(({ data }) => {
      console.log(data);
      if (data.workshops && data.categories) {
        dispatch({
          type: GET_INITIAL_WORKSHOPS,
          payload: {
            workshops: data.workshops,
            categories: data.categories,
          }
        })
      }
    })
    .catch(err => console.log(err))
}

export const getWorkshop = (workshopid) => (dispatch) => {
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
        const category = (data.workshop.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: ADD_WORKSHOP,
          payload: {
            workshop: data.workshop,
            category,
          }
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
        const category = (data.workshop.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: EDIT_WORKSHOP,
          payload: {
            workshop: data.workshop,
            category,
          }
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
        const category = (data.workshop.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: DELETE_WORKSHOP,
          payload: {
            workshop: data.workshop,
            category,
          }
        })
      }
    })
    .catch(err => console.log(err))
}