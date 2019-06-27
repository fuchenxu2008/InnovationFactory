import {
  GET_KICKSTARTERS_REQUEST,
  GET_KICKSTARTERS_SUCCESS,
  GET_KICKSTARTERS_FAILURE,
  GET_KICKSTARTER_REQUEST,
  GET_KICKSTARTER_SUCCESS,
  GET_KICKSTARTER_FAILURE,
  CREATE_KICKSTARTER_REQUEST,
  CREATE_KICKSTARTER_SUCCESS,
  CREATE_KICKSTARTER_FAILURE,
  UPDATE_KICKSTARTER_REQUEST,
  UPDATE_KICKSTARTER_SUCCESS,
  UPDATE_KICKSTARTER_FAILURE,
  DELETE_KICKSTARTER_REQUEST,
  DELETE_KICKSTARTER_SUCCESS,
  DELETE_KICKSTARTER_FAILURE,
  GET_ALL_KICKSTARTERS_REQUEST,
  GET_ALL_KICKSTARTERS_SUCCESS,
  GET_ALL_KICKSTARTERS_FAILURE,
  APPROVE_KICKSTARTER_REQUEST,
  APPROVE_KICKSTARTER_SUCCESS,
  APPROVE_KICKSTARTER_FAILURE
} from '../constants/kickstarter';

import * as api from '../API/kickstarter';

export const getKickstarters = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: GET_KICKSTARTERS_REQUEST
    });
    return api
      .getKickstarters()
      .then(({ data }) => {
        console.log(data);
        if (data.kickstarters) {
          dispatch({
            type: GET_KICKSTARTERS_SUCCESS,
            payload: data.kickstarters
          });
          resolve(data.kickstarters);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_KICKSTARTERS_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};

export const getKickstarter = kickstarterId => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: GET_KICKSTARTER_REQUEST
    });
    return api
      .getKickstarter(kickstarterId)
      .then(({ data }) => {
        console.log(data);
        if (data.kickstarter) {
          dispatch({
            type: GET_KICKSTARTER_SUCCESS,
            payload: data.kickstarter
          });
          resolve(data.kickstarter);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_KICKSTARTER_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};

export const createKickstarter = kickstarter => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: CREATE_KICKSTARTER_REQUEST
    });
    return api
      .createKickstarter(kickstarter, token)
      .then(({ data }) => {
        if (data.kickstarter) {
          dispatch({
            type: CREATE_KICKSTARTER_SUCCESS,
            payload: data.kickstarter
          });
          resolve(data.kickstarter);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: CREATE_KICKSTARTER_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};

export const updateKickstarter = (id, update) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: UPDATE_KICKSTARTER_REQUEST
    });
    return api
      .updateKickstarter(id, update, token)
      .then(({ data }) => {
        if (data) {
          dispatch({
            type: UPDATE_KICKSTARTER_SUCCESS,
            payload: data
          });
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_KICKSTARTER_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};

export const deleteKickstarter = id => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: DELETE_KICKSTARTER_REQUEST
    });
    return api
      .deleteKickstarter(id, token)
      .then(({ data }) => {
        if (data.kickstarter) {
          dispatch({
            type: DELETE_KICKSTARTER_SUCCESS
          });
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: DELETE_KICKSTARTER_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};

/**
 * Admin
 */

export const getAllKickstarters = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: GET_ALL_KICKSTARTERS_REQUEST
    });
    return api
      .getAllKickstarters()
      .then(({ data }) => {
        console.log(data);
        if (data.kickstarters) {
          dispatch({
            type: GET_ALL_KICKSTARTERS_SUCCESS,
            payload: data.kickstarters
          });
          resolve(data.kickstarters);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ALL_KICKSTARTERS_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};

export const approveKickstarter = id => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: APPROVE_KICKSTARTER_REQUEST
    });
    return api
      .approveKickstarter(id, token)
      .then(({ data }) => {
        if (data.message) {
          dispatch({
            type: APPROVE_KICKSTARTER_SUCCESS
          });
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: APPROVE_KICKSTARTER_FAILURE,
          payload: err
        });
        reject(err);
      });
  });
};
