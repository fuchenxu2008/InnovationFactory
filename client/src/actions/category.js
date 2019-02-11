import {
  GET_CACHED_EVENT_CATEGORY,
  GET_CACHED_WORKSHOP_CATEGORY,
  GET_EVENT_CATEGORY,
  GET_WORKSHOP_CATEGORY,
  ADD_EVENT_CATEGORY,
  EDIT_EVENT_CATEGORY,
  DELETE_EVENT_CATEGORY,
  ADD_WORKSHOP_CATEGORY,
  EDIT_WORKSHOP_CATEGORY,
  DELETE_WORKSHOP_CATEGORY,
} from '../constants/category';
import * as api from '../API/category';

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
    api.getCategory(id)
      .then(({ data }) => {
        console.log(data);
        if (data.category) {
          if (type === 'event')
            dispatch({
              type: GET_EVENT_CATEGORY,
              payload: data.category,
            })
          if (type === 'workshop')
            dispatch({
              type: GET_WORKSHOP_CATEGORY,
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
  return api.addCategory(category, token)
    .then(({ data }) => {
      console.log(data);
      if (data.category) {
        if (category.type === 'event')
          dispatch({
            type: ADD_EVENT_CATEGORY,
            payload: data.category,
          })
        if (category.type === 'workshop')
          dispatch({
            type: ADD_WORKSHOP_CATEGORY,
            payload: data.category,
          })
      }
    })
    .catch(err => console.log(err))
}

export const updateCategory = ({ id, category }) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.updateCategory({ id, category }, token)
    .then(({ data }) => {
      console.log(data);
      if (data.category) {
        if (category.type === 'event')
          dispatch({
            type: EDIT_EVENT_CATEGORY,
            payload: data.category,
          })
        if (category.type === 'workshop')
          dispatch({
            type: EDIT_WORKSHOP_CATEGORY,
            payload: data.category,
          })
      }
    })
    .catch(err => console.log(err))
}

export const deleteCategory = (categoryid) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.deleteCategory(categoryid, token)
    .then(({ data }) => {
      console.log(data);
      if (data.category) {
        if (data.category.type === 'event')
          dispatch({
            type: DELETE_EVENT_CATEGORY,
            payload: data.category,
          })
        if (data.category.type === 'workshop')
          dispatch({
            type: DELETE_WORKSHOP_CATEGORY,
            payload: data.category,
          })
      }
    })
    .catch(err => console.log(err))
}