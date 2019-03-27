import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_INFO,
  LOGOUT,
  PERMIT_ADMIN_ACCESS,
} from '../constants/global'

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
    case LOGIN_FAILURE:
      return INITIAL_STATE;
    case SET_USER_INFO:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          userInfo: action.payload,
        }
      }
    case LOGOUT:
      return INITIAL_STATE;
    case PERMIT_ADMIN_ACCESS:
      return {
        ...state,
        adminAccessBefore: action.payload,
      }
    default:
      return state
  }
}
