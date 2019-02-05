/**
 * WeChat related API calls
 */
import Taro from '@tarojs/taro';
import { request } from '../utils/request';
import { ROOT_URL } from '../config';

export const login = async () => {
  const { code } = await Taro.login();
  if (code) {
    return request({
      url: `${ROOT_URL}/api/auth/login`,
      data: { code },
      method: 'POST',
    })
  }
}

export const updateUserInfo = (userInfo, token) => {
  return request({
    url: `${ROOT_URL}/api/auth/user`,
    method: 'POST',
    data: { userInfo },
    token,
  })
}

export const authenticateAdmin = (token) => {
  return request({
    url: `${ROOT_URL}/api/admin/manage/auth`,
    method: 'GET',
    token,
  })
}