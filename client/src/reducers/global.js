import { LOGIN_SUCCESS, SET_USER_INFO, LOGOUT, PERMIT_ADMIN_ACCESS } from '../constants/global'

const INITIAL_STATE = {
  currentUser: null,
  adminAccessBefore: null,
}

export default function event(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
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
    case LOGOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userInfo: null,
        }
      }
    case PERMIT_ADMIN_ACCESS:
      return {
        ...state,
        adminAccessBefore: action.payload,
      }
    default:
      return state
  }
}
