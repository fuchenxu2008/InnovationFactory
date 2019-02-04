import {
  LOGIN,
  SET_USER_INFO
} from '../constants/global';
import * as api from '../API/wechat';

export const login = () => (dispatch) => {
  api.login()
    .then(({data}) => {
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

export const setUserInfo = (info) => {
  return {
    type: SET_USER_INFO,
    payload: info,
  }
};
