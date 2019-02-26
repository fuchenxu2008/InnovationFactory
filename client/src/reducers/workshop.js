import {
  ADD_WORKSHOP_SUCCESS,
  EDIT_WORKSHOP_SUCCESS,
  DELETE_WORKSHOP_SUCCESS,
  GET_INITIAL_WORKSHOPS_SUCCESS,
  GET_PAGINATED_WORKSHOPS_SUCCESS,
  GET_WORKSHOP_SUCCESS,
} from '../constants/workshop';
import {
  GET_WORKSHOP_CATEGORY_SUCCESS,
  GET_CACHED_WORKSHOP_CATEGORY,
  ADD_WORKSHOP_CATEGORY_SUCCESS,
  EDIT_WORKSHOP_CATEGORY_SUCCESS,
  DELETE_WORKSHOP_CATEGORY_SUCCESS,
} from '../constants/category';

const INITIAL_STATE = {
  allWorkshops: {},
  currentWorkshop: null,
  workshopCategories: [],
  currentWorkshopCategory: null,
}

export default function workshop (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INITIAL_WORKSHOPS_SUCCESS:
      return {
        ...state,
        allWorkshops: action.payload.workshops,
        workshopCategories: action.payload.categories,
        currentWorkshopCategory: action.payload.categories[0],
      }
    case GET_PAGINATED_WORKSHOPS_SUCCESS:
      return {
        ...state,
        allWorkshops: {
          ...state.allWorkshops,
          [action.payload.category]: state.allWorkshops[action.payload.category].concat(action.payload.workshops),
        }
      }
    case GET_WORKSHOP_SUCCESS:
      return {
        ...state,
        currentWorkshop: action.payload,
      }
    // Admin functions
    case ADD_WORKSHOP_SUCCESS:
      return {
        ...state,
        allWorkshops: {
          ...state.allWorkshops,
          [action.payload.category]: state.allWorkshops[action.payload.category].concat(action.payload.workshop)
        }
      }
    case EDIT_WORKSHOP_SUCCESS:
      return {
        ...state,
        allWorkshops: {
          ...state.allWorkshops,
          [action.payload.category]: state.allWorkshops[action.payload.category].map(w => w._id === action.payload.workshop._id ? action.payload.workshop : w)
        }
      }
    case DELETE_WORKSHOP_SUCCESS:
      return {
        ...state,
        allWorkshops: {
          ...state.allWorkshops,
          [action.payload.category]: state.allWorkshops[action.payload.category].filter(existingWorkshop => existingWorkshop._id !== action.payload.workshop._id)
        }
      }
    case GET_WORKSHOP_CATEGORY_SUCCESS:
      return {
        ...state,
        currentWorkshopCategory: action.payload,
        workshopCategories: state.workshopCategories.concat(action.payload),
      }
    case GET_CACHED_WORKSHOP_CATEGORY:
      return {
        ...state,
        currentWorkshopCategory: action.payload,
      }
    case ADD_WORKSHOP_CATEGORY_SUCCESS:
      return {
        ...state,
        workshopCategories: state.workshopCategories.concat(action.payload)
      }
    case EDIT_WORKSHOP_CATEGORY_SUCCESS:
      return {
        ...state,
        workshopCategories: state.workshopCategories.map(e => e._id === action.payload._id ? action.payload : e)
      }
    case DELETE_WORKSHOP_CATEGORY_SUCCESS:
      return {
        ...state,
        workshopCategories: state.workshopCategories.filter(existingWorkshopCategory => existingWorkshopCategory._id !== action.payload._id)
      }
    default:
      return state
  }
}
