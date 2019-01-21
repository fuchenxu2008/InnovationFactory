import { ADD_EVENT } from '../constants/event'

const INITIAL_STATE = {
  allEvents: [],
}

export default function event (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.concat(action.payload)
      }
    //  case MINUS:
    //    return {
    //      ...state,
    //      num: state.num - 1
    //    }
     default:
       return state
  }
}
