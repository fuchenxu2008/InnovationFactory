import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  GET_ALL_EVENTS,
  GET_EVENT,
  GET_CACHED_EVENT
} from '../constants/event';

const INITIAL_STATE = {
  allEvents: [],
  currentEvent: null,
}

export default function event (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload,
      }
    case GET_EVENT:
      return {
        ...state,
        currentEvent: action.payload,
        allEvents: state.allEvents.concat(action.payload)
      }
    case GET_CACHED_EVENT:
      return {
        ...state,
        currentEvent: action.payload,
      }
    case ADD_EVENT:
      return {
        ...state,
        allEvents: [action.payload, ...state.allEvents]
      }
    case EDIT_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.map(e => e._id === action.payload._id ? action.payload : e)
      }
    case DELETE_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.filter(existingEvent => existingEvent._id !== action.payload._id)
      }
     default:
       return state
  }
}
