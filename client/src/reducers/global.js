import { LOGIN, SET_USER_INFO } from '../constants/global'

const INITIAL_STATE = {
  currentUser: null,
}

export default function event(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: {
            ...state.currentUser,
            _id: action.payload._id,
            token: action.payload.token,
        },
      }
    case SET_USER_INFO:
      return {
          ...state,
          currentUser: {
              ...state.currentUser,
              userInfo: action.payload,
          }
      }
    default:
      return state
  }
}
