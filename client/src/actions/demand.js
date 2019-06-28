import {
  GET_DEMANDS_REQUEST,
  GET_DEMANDS_SUCCESS,
  GET_DEMANDS_FAILURE,
  GET_MY_DEMANDS_FAILURE,
  GET_MY_DEMANDS_REQUEST,
  GET_MY_DEMANDS_SUCCESS,
  GET_DEMAND_REQUEST,
  GET_DEMAND_SUCCESS,
  GET_DEMAND_FAILURE,
  CREATE_DEMAND_REQUEST,
  CREATE_DEMAND_SUCCESS,
  CREATE_DEMAND_FAILURE,
  UPDATE_DEMAND_REQUEST,
  UPDATE_DEMAND_SUCCESS,
  UPDATE_DEMAND_FAILURE,
  DELETE_DEMAND_REQUEST,
  DELETE_DEMAND_SUCCESS,
  DELETE_DEMAND_FAILURE,
  GET_ALL_DEMANDS_REQUEST,
  GET_ALL_DEMANDS_SUCCESS,
  GET_ALL_DEMANDS_FAILURE,
  APPROVE_DEMAND_REQUEST,
  APPROVE_DEMAND_SUCCESS,
  APPROVE_DEMAND_FAILURE,
} from '../constants/demand';

import * as api from '../API/demand'

export const getDemands = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: GET_DEMANDS_REQUEST
    });
    return api.getDemands()
      .then(({ data }) => {
        if (data.demands) {
          dispatch({
            type: GET_DEMANDS_SUCCESS,
            payload: data.demands,
          });
          resolve(data.demands);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_DEMANDS_FAILURE,
          payload: err,
        })
        reject(err);
      })
  });
}

export const getMyDemands = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: GET_MY_DEMANDS_REQUEST
    });
    return api.getMyDemands(token)
      .then(({ data }) => {
        if (data.demands) {
          dispatch({
            type: GET_MY_DEMANDS_SUCCESS,
            payload: data.demands,
          });
          resolve(data.demands);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_MY_DEMANDS_FAILURE,
          payload: err,
        })
        reject(err);
      })
  });
}

export const getDemand = (demandId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: GET_DEMAND_REQUEST
    });
    return api.getDemand(demandId)
      .then(({ data }) => {
        if (data.demand) {
          dispatch({
            type: GET_DEMAND_SUCCESS,
            payload: data.demand,
          });
          resolve(data.demand);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_DEMAND_FAILURE,
          payload: err,
        })
        reject(err);
      })
  });
}

export const createDemand = (demand) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: CREATE_DEMAND_REQUEST
    });
    return api.createDemand(demand, token)
      .then(({ data }) => {
        if (data.demand) {
          dispatch({
            type: CREATE_DEMAND_SUCCESS,
            payload: data.demand,
          });
          resolve(data.demand);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: CREATE_DEMAND_FAILURE,
          payload: err,
        })
        reject(err);
      })
  });
}

export const completeDemand = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: UPDATE_DEMAND_REQUEST
    });
    return api.completeDemand(id, token)
      .then(({ data }) => {
        if (data) {
          dispatch({
            type: UPDATE_DEMAND_SUCCESS,
            payload: data,
          })
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: UPDATE_DEMAND_FAILURE,
          payload: err,
        })
        reject(err);
      })
  })
}

export const deleteDemand = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: DELETE_DEMAND_REQUEST
    });
    return api.deleteDemand(id, token)
      .then(({ data }) => {
        if (data.demand) {
          dispatch({
            type: DELETE_DEMAND_SUCCESS,
          })
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: DELETE_DEMAND_FAILURE,
          payload: err,
        })
        reject(err);
      })
  })
}

/**
 * Admin
 */

export const getAllDemands = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: GET_ALL_DEMANDS_REQUEST
    });
    return api.getAllDemands()
      .then(({ data }) => {
        console.log(data);
        if (data.demands) {
          dispatch({
            type: GET_ALL_DEMANDS_SUCCESS,
            payload: data.demands,
          })
          resolve(data.demands)
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_ALL_DEMANDS_FAILURE,
          payload: err,
        })
        reject(err);
      })
  });
}

export const approveDemand = (id) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: APPROVE_DEMAND_REQUEST
    });
    return api.approveDemand(id, token)
      .then(({ data }) => {
        if (data.message) {
          dispatch({
            type: APPROVE_DEMAND_SUCCESS,
          })
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: APPROVE_DEMAND_FAILURE,
          payload: err,
        })
        reject(err);
      })
  })
}
