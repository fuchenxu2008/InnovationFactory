import { ADD_EVENT, GET_ALL_EVENTS, DELETE_EVENT, GET_EVENT, GET_CACHED_EVENT } from '../constants/event'

const INITIAL_STATE = {
  allEvents: [],
  currentEvent: null,
}

export default function event (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
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
        allEvents: state.allEvents.concat(action.payload)
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
