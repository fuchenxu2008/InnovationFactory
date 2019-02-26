import {
  GET_ALL_PRINTERS_REQUEST,
  GET_ALL_PRINTERS_SUCCESS,
  GET_CACHED_PRINTER,
  GET_PRINTER_REQUEST,
  GET_PRINTER_SUCCESS,
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
      }
    })
    .catch(err => console.log(err))
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
        }
      })
      .catch(err => console.log(err))
  }
}
