import {
  GET_ALL_PRINTERS_SUCCESS,
  GET_CACHED_PRINTER,
  GET_PRINTER_SUCCESS,
} from '../constants/printer';

const INITIAL_STATE = {
  allPrinters: [],
  currentPrinter: null,
}

export default function printer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_PRINTERS_SUCCESS:
      return {
        ...state,
        allPrinters: action.payload,
      }
    case GET_PRINTER_SUCCESS:
      return {
        ...state,
        currentPrinter: action.payload,
        allPrinters: state.allPrinters.concat(action.payload)
      }
    case GET_CACHED_PRINTER:
      return {
        ...state,
        currentPrinter: action.payload,
      }
    default:
      return state
  }
}
