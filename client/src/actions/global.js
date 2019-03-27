import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_INFO,
  LOGOUT,
  PERMIT_ADMIN_ACCESS,
  CLEAN_CACHE,
} from '../constants/global';
import * as api from '../API/auth';

export const login = () => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST
  });
  return api.login()
    .then(({ data }) => {
      if (data._id && data.token) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            _id: data._id,
            token: data.token,
          },
        })
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err
      })
    })
};

export const setUserInfo = (userInfo) => (dispatch, getState) => {
  const { token } = getState().global.currentUser || {};
  if (!token) return console.log('Requires user login token');
  return api.updateUserInfo(userInfo, token)
    .then(() => {
      dispatch({
        type: SET_USER_INFO,
        payload: userInfo,
      })
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err
      })
      dispatch(login());
    })
};

export const logout = () => ({
  type: LOGOUT,
});

export const authenticateAdmin = () => (dispatch, getState) => new Promise((resolve, reject) => {
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
        resolve();
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .catch(err => {
      console.log(err)
      reject(err);
    });
});

export const cleanCache = () => ({
  type: CLEAN_CACHE,
})
