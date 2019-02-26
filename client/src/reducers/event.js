import {
  ADD_EVENT_SUCCESS,
  EDIT_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  GET_INITIAL_EVENTS_SUCCESS,
  GET_PAGINATED_EVENTS_SUCCESS,
  GET_EVENT_SUCCESS,
} from '../constants/event';
import {
  GET_CACHED_EVENT_CATEGORY,
  GET_EVENT_CATEGORY_SUCCESS,  
  ADD_EVENT_CATEGORY_SUCCESS,
  EDIT_EVENT_CATEGORY_SUCCESS,
  DELETE_EVENT_CATEGORY_SUCCESS,
} from '../constants/category';

const INITIAL_STATE = {
  allEvents: {},
  currentEvent: null,
  eventCategories: [],
  currentEventCategory: null,
}

export default function event (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INITIAL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload.events,
        eventCategories: action.payload.categories,
        currentEventCategory: action.payload.categories[0],
      }
    case GET_PAGINATED_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: {
          ...state.allEvents,
          [action.payload.category]: state.allEvents[action.payload.category].concat(action.payload.events),
        }
      }
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        currentEvent: action.payload,
      }
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: {
          ...state.allEvents,
          [action.payload.category]: state.allEvents[action.payload.category].concat(action.payload.event)
        }
      }
    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: {
          ...state.allEvents,
          [action.payload.category]: state.allEvents[action.payload.category].map(e => e._id === action.payload.event._id ? action.payload.event : e)
        }
      }
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        allEvents: {
          ...state.allEvents,
          [action.payload.category]: state.allEvents[action.payload.category].filter(existingEvent => existingEvent._id !== action.payload.event._id)
        }
      }
    case GET_EVENT_CATEGORY_SUCCESS:
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
    case ADD_EVENT_CATEGORY_SUCCESS:
      return {
        ...state,
        eventCategories: state.eventCategories.concat(action.payload)
      }
    case EDIT_EVENT_CATEGORY_SUCCESS:
      return {
        ...state,
        eventCategories: state.eventCategories.map(e => e._id === action.payload._id ? action.payload : e),
        currentEventCategory: state.currentEventCategory._id === action.payload._id ? action.payload : state.currentEventCategory,
      }
    case DELETE_EVENT_CATEGORY_SUCCESS:
      return {
        ...state,
        eventCategories: state.eventCategories.filter(existingEventCategory => existingEventCategory._id !== action.payload._id)
      }
    default:
      return state
  }
}
