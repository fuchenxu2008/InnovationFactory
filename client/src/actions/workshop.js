import {
  ADD_WORKSHOP_REQUEST,
  ADD_WORKSHOP_SUCCESS,
  ADD_WORKSHOP_FAILURE,
  DELETE_WORKSHOP_REQUEST,
  DELETE_WORKSHOP_SUCCESS,
  DELETE_WORKSHOP_FAILURE,
  EDIT_WORKSHOP_REQUEST,
  EDIT_WORKSHOP_SUCCESS,
  EDIT_WORKSHOP_FAILURE,
  GET_INITIAL_WORKSHOPS_REQUEST,
  GET_INITIAL_WORKSHOPS_SUCCESS,
  GET_INITIAL_WORKSHOPS_FAILURE,
  GET_PAGINATED_WORKSHOPS_REQUEST,
  GET_PAGINATED_WORKSHOPS_SUCCESS,
  GET_PAGINATED_WORKSHOPS_FAILURE,
  GET_WORKSHOP_REQUEST,
  GET_WORKSHOP_SUCCESS,
  GET_WORKSHOP_FAILURE,
} from '../constants/workshop';

import * as api from '../API/workshop'

export const getInitialWorkshops = () => (dispatch) => {
  dispatch({
    type: GET_INITIAL_WORKSHOPS_REQUEST
  });
  return api.getInitialWorkshops()
    .then(({ data }) => {
      console.log(data);
      if (data.workshops && data.categories) {
        dispatch({
          type: GET_INITIAL_WORKSHOPS_SUCCESS,
          payload: {
            workshops: data.workshops,
            categories: data.categories,
          }
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_INITIAL_WORKSHOPS_FAILURE,
        payload: err
      })
    })
}

export const getPaginatedWorkshops = ({ start, category }) => (dispatch) => {
  dispatch({
    type: GET_PAGINATED_WORKSHOPS_REQUEST
  });
  return api.getPaginatedWorkshops({ start, category })
    .then(({ data }) => {
      console.log(data);
      if (data.workshops) {
        dispatch({
          type: GET_PAGINATED_WORKSHOPS_SUCCESS,
          payload: {
            workshops: data.workshops,
            category,
          }
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_PAGINATED_WORKSHOPS_FAILURE,
        payload: err
      })
    })
}

export const getWorkshop = (workshopid) => (dispatch) => {
  dispatch({
    type: GET_WORKSHOP_REQUEST
  });
  return api.getWorkshop(workshopid)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        dispatch({
          type: GET_WORKSHOP_SUCCESS,
          payload: data.workshop,
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_WORKSHOP_FAILURE,
        payload: err
      })
    })
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
  dispatch({
    type: ADD_WORKSHOP_REQUEST
  });
  return api.addWorkshop(workshop, token)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        const category = (data.workshop.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: ADD_WORKSHOP_SUCCESS,
          payload: {
            workshop: data.workshop,
            category,
          }
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: ADD_WORKSHOP_FAILURE,
        payload: err
      })
    })
}

export const updateWorkshop = (edition) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: EDIT_WORKSHOP_REQUEST
  });
  return api.updateWorkshop(edition, token)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        const category = (data.workshop.category || {})._id;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: EDIT_WORKSHOP_SUCCESS,
          payload: {
            workshop: data.workshop,
            category,
          }
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: EDIT_WORKSHOP_FAILURE,
        payload: err
      })
    })
}

export const deleteWorkshop = (workshopid) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  dispatch({
    type: DELETE_WORKSHOP_REQUEST
  });
  return api.deleteWorkshop(workshopid, token)
    .then(({ data }) => {
      console.log(data);
      if (data.workshop) {
        const { category } = data.workshop;
        if (!category) throw Error('No category supplied!');
        dispatch({
          type: DELETE_WORKSHOP_SUCCESS,
          payload: {
            workshop: data.workshop,
            category,
          }
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: DELETE_WORKSHOP_FAILURE,
        payload: err
      })
    })
}
