import { LOGIN, SET_USER_INFO } from '../constants/global';
import * as api from '../API/wechat';

export const login = () => (dispatch) => {
    api.login()
        .then(res => res.data)
        .then(data => {
            if (data.openid) {
                dispatch({
                    type: LOGIN,
                    payload: data.openid,
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