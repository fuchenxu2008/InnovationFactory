/**
 * WeChat related API calls
 */
import Taro from '@tarojs/taro';
import { ROOT_URL } from '../config';

export const login = async () => {
  const { code } = await Taro.login();
  return Taro.request({
    url: `${ROOT_URL}/api/wechat/login`,
    data: { code },
    method: 'POST',
  })
}

export const logout = () => {

}