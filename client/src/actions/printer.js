import {
  GET_ALL_PRINTERS_REQUEST,
  GET_ALL_PRINTERS_SUCCESS,
  GET_ALL_PRINTERS_FAILURE,
  GET_CACHED_PRINTER,
  GET_PRINTER_REQUEST,
  GET_PRINTER_SUCCESS,
  GET_PRINTER_FAILURE,
  GET_TIMESLOTS_REQUEST,
  GET_TIMESLOTS_SUCCESS,
  GET_TIMESLOTS_FAILURE,
  PUBLISH_TIMESLOTS_REQUEST,
  PUBLISH_TIMESLOTS_SUCCESS,
  PUBLISH_TIMESLOTS_FAILURE,
} from '../constants/printer';

import * as api from '../API/printer'

export const getAllPrinters = () => (dispatch) => {
  dispatch({
    type: GET_ALL_PRINTERS_REQUEST
  });
  return api.getAllPrinters()
    .then(({ data }) => {
      console.log(data);
      if (data.printers) {
        dispatch({
          type: GET_ALL_PRINTERS_SUCCESS,
          payload: data.printers,
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_PRINTERS_FAILURE,
        payload: err,
      })
    })
}

export const getPrinter = (printerid) => (dispatch, getState) => {
  // Get local state cache
  // If has the printer, read from cache else fetch from server
  const { allPrinters } = getState().printer;
  const cachedPrinter = allPrinters.filter(printer => printer._id === printerid)[0]
  if (cachedPrinter) {
    dispatch({
      type: GET_CACHED_PRINTER,
      payload: cachedPrinter
    })
  } else {
    dispatch({
      type: GET_PRINTER_REQUEST
    });
    return api.getPrinter(printerid)
      .then(({ data }) => {
        console.log(data);
        if (data.printer) {
          dispatch({
            type: GET_PRINTER_SUCCESS,
            payload: data.printer,
          })
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_PRINTER_FAILURE,
          payload: err,
        })
      })
  }
}

export const getTimeSlots = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: GET_TIMESLOTS_REQUEST
    });
    return api.getTimeSlots(token)
      .then(({ data }) => {
        if (data) {
          dispatch({
            type: GET_TIMESLOTS_SUCCESS,
            payload: data,
          })
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: GET_TIMESLOTS_FAILURE,
          payload: err,
        })
        reject(err);
      })
  })
}

export const publishTimeSlots = (updatedTimeSlots) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { token } = getState().global.currentUser || {};
    if (!token) return console.log('Requires user login token');
    dispatch({
      type: PUBLISH_TIMESLOTS_REQUEST
    });
    return api.publishTimeSlots(updatedTimeSlots, token)
      .then(({ data }) => {
        if (data.timeSlots) {
          dispatch({
            type: PUBLISH_TIMESLOTS_SUCCESS,
          })
          resolve(data);
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .catch(err => {
        dispatch({
          type: PUBLISH_TIMESLOTS_FAILURE,
          payload: err,
        })
        reject(err);
      })
  })
}
