import {
  ADD_WORKSHOP,
  EDIT_WORKSHOP,
  DELETE_WORKSHOP,
  GET_ALL_WORKSHOPS,
  GET_WORKSHOP,
  GET_CACHED_WORKSHOP
} from '../constants/workshop';

const INITIAL_STATE = {
  allWorkshops: [],
  currentWorkshop: null,
}

export default function workshop (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_WORKSHOPS:
      return {
        ...state,
        allWorkshops: action.payload,
      }
    case GET_WORKSHOP:
      return {
        ...state,
        currentWorkshop: action.payload,
        allWorkshops: state.allWorkshops.concat(action.payload)
      }
    case GET_CACHED_WORKSHOP:
      return {
        ...state,
        currentWorkshop: action.payload,
      }
    case ADD_WORKSHOP:
      return {
        ...state,
        allWorkshops: state.allWorkshops.concat(action.payload)
      }
    case EDIT_WORKSHOP:
      return {
        ...state,
        allWorkshops: state.allWorkshops.map(e => e._id === action.payload._id ? action.payload : e)
      }
    case DELETE_WORKSHOP:
      return {
        ...state,
        allWorkshops: state.allWorkshops.filter(existingWorkshop => existingWorkshop._id !== action.payload._id)
      }
     default:
       return state
  }
}
