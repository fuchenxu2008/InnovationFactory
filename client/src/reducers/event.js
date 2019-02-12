import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  GET_ALL_EVENTS,
  GET_EVENT,
  GET_CACHED_EVENT
} from '../constants/event';
import {
  GET_CACHED_EVENT_CATEGORY,
  GET_EVENT_CATEGORY,  
  ADD_EVENT_CATEGORY,
  EDIT_EVENT_CATEGORY,
  DELETE_EVENT_CATEGORY,
} from '../constants/category';

const INITIAL_STATE = {
  allEvents: [],
  currentEvent: null,
  eventCategories: [],
  currentEventCategory: null,
}

export default function event (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload.events,
        eventCategories: action.payload.categories,
        currentEventCategory: action.payload.categories[0],
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
    case GET_EVENT_CATEGORY:
      return {
        ...state,
        currentEventCategory: action.payload,
        eventCategories: state.eventCategories.concat(action.payload),
      }
    case GET_CACHED_EVENT_CATEGORY:
      return {
        ...state,
        currentEventCategory: action.payload,
      }
    case ADD_EVENT_CATEGORY:
      return {
        ...state,
        eventCategories: state.eventCategories.concat(action.payload)
      }
    case EDIT_EVENT_CATEGORY:
      return {
        ...state,
        eventCategories: state.eventCategories.map(e => e._id === action.payload._id ? action.payload : e),
        currentEventCategory: state.currentEventCategory._id === action.payload._id ? action.payload : state.currentEventCategory,
      }
    case DELETE_EVENT_CATEGORY:
      return {
        ...state,
        eventCategories: state.eventCategories.filter(existingEventCategory => existingEventCategory._id !== action.payload._id)
      }
    default:
      return state
  }
}
