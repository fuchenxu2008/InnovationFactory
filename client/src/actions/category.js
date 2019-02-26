import {
  GET_CACHED_EVENT_CATEGORY,
  GET_CACHED_WORKSHOP_CATEGORY,
  GET_EVENT_CATEGORY_REQUEST,
  GET_EVENT_CATEGORY_SUCCESS,
  GET_WORKSHOP_CATEGORY_REQUEST,
  GET_WORKSHOP_CATEGORY_SUCCESS,
  ADD_EVENT_CATEGORY_REQUEST,
  ADD_EVENT_CATEGORY_SUCCESS,
  EDIT_EVENT_CATEGORY_REQUEST,
  EDIT_EVENT_CATEGORY_SUCCESS,
  DELETE_EVENT_CATEGORY_REQUEST,
  DELETE_EVENT_CATEGORY_SUCCESS,
  ADD_WORKSHOP_CATEGORY_REQUEST,
  ADD_WORKSHOP_CATEGORY_SUCCESS,
  EDIT_WORKSHOP_CATEGORY_REQUEST,
  EDIT_WORKSHOP_CATEGORY_SUCCESS,
  DELETE_WORKSHOP_CATEGORY_REQUEST,
  DELETE_WORKSHOP_CATEGORY_SUCCESS,
} from '../constants/category';
import * as api from '../API/category';

export const setCurrentCategory = (category) => (dispatch) => {
  let type;
  if (category.type === 'event') type = GET_CACHED_EVENT_CATEGORY;
  if (category.type === 'workshop') type = GET_CACHED_WORKSHOP_CATEGORY;
  dispatch({
    type,
    payload: category,
  })
}

export const getCategory = ({ id, type }) => (dispatch, getState) => {
  // Get local state cache
  // If has the category, read from cache else fetch from server
  let allCategories = [];
  if (type === 'event') allCategories = (getState().event || {}).eventCategories;
  if (type === 'workshop') allCategories = (getState().workshop || {}).workshopCategories;
  const cachedCategory = allCategories.filter(category => category._id === id)[0]
  if (cachedCategory) {
    if (type === 'event')
      dispatch({
        type: GET_CACHED_EVENT_CATEGORY,
        payload: cachedCategory
      })
    if (type === 'workshop')
      dispatch({
        type: GET_CACHED_WORKSHOP_CATEGORY,
        payload: cachedCategory
      })
  } else {
    if (type === 'event') dispatch({ type: GET_EVENT_CATEGORY_REQUEST });
    if (type === 'workshop') dispatch({ type: GET_WORKSHOP_CATEGORY_REQUEST });
    return api.getCategory(id)
      .then(({ data }) => {
        console.log(data);
        if (data.category) {
          if (type === 'event')
            dispatch({
              type: GET_EVENT_CATEGORY_SUCCESS,
              payload: data.category,
            })
          if (type === 'workshop')
            dispatch({
              type: GET_WORKSHOP_CATEGORY_SUCCESS,
              payload: data.category,
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
export const addCategory = (category) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  if (category.type === 'event') dispatch({ type: ADD_EVENT_CATEGORY_REQUEST });
  if (category.type === 'workshop') dispatch({ type: ADD_WORKSHOP_CATEGORY_REQUEST });
  return api.addCategory(category, token)
    .then(({ data }) => {
      console.log(data);
      if (data.category) {
        if (category.type === 'event')
          dispatch({
            type: ADD_EVENT_CATEGORY_SUCCESS,
            payload: data.category,
          })
        if (category.type === 'workshop')
          dispatch({
            type: ADD_WORKSHOP_CATEGORY_SUCCESS,
            payload: data.category,
          })
      }
    })
    .catch(err => console.log(err))
}

export const updateCategory = ({ id, category }) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  if (category.type === 'event') dispatch({ type: EDIT_EVENT_CATEGORY_REQUEST });
  if (category.type === 'workshop') dispatch({ type: EDIT_WORKSHOP_CATEGORY_REQUEST });
  return api.updateCategory({ id, category }, token)
    .then(({ data }) => {
      console.log(data);
      if (data.category) {
        if (category.type === 'event')
          dispatch({
            type: EDIT_EVENT_CATEGORY_SUCCESS,
            payload: data.category,
          })
        if (category.type === 'workshop')
          dispatch({
            type: EDIT_WORKSHOP_CATEGORY_SUCCESS,
            payload: data.category,
          })
      }
    })
    .catch(err => console.log(err))
}

export const deleteCategory = (categoryid, type) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  if (type === 'event') dispatch({ type: DELETE_EVENT_CATEGORY_REQUEST });
  if (type === 'workshop') dispatch({ type: DELETE_WORKSHOP_CATEGORY_REQUEST });
  return api.deleteCategory(categoryid, token)
    .then(({ data }) => {
      console.log(data);
      if (data.category) {
        if (type === 'event')
          dispatch({
            type: DELETE_EVENT_CATEGORY_SUCCESS,
            payload: data.category,
          })
        if (type === 'workshop')
          dispatch({
            type: DELETE_WORKSHOP_CATEGORY_SUCCESS,
            payload: data.category,
          })
      }
    })
    .catch(err => console.log(err))
}