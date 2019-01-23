import { ADD_EVENT, GET_ALL_EVENTS } from '../constants/event'

const INITIAL_STATE = {
  allEvents: [],
}

export default function event (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        allEvents: action.payload
      }
    case ADD_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.concat(action.payload)
      }
     default:
       return state
  }
}
