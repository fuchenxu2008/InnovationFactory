import {
  LOGIN,
  SET_USER_INFO,
  PERMIT_ADMIN_ACCESS,
} from '../constants/global';
import * as api from '../API/auth';

export const login = () => (dispatch) => {
  api.login()
    .then(({ data }) => {
      if (data._id && data.token) {
        dispatch({
          type: LOGIN,
          payload: {
            _id: data._id,
            token: data.token,
          },
        })
      }
    })
    .catch((res) => console.log('err', res))
};

export const setUserInfo = (userInfo) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  api.updateUserInfo(userInfo, token)
    .then(() => {
      dispatch({
        type: SET_USER_INFO,
        payload: userInfo,
      })
    })
    .catch(err => console.log(err))
};

export const authenticateAdmin = () => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.authenticateAdmin(token)
    .then(({ data }) => {
      console.log(data);
      if (data.adminAccessBefore) {
        dispatch({
          type: PERMIT_ADMIN_ACCESS,
          payload: data.adminAccessBefore,
        })
      }
    })
    .catch(err => console.log(err))
}
