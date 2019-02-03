import Taro from '@tarojs/taro';
import { ROOT_URL } from '../config';

export const getMyOrders = async (type, openid) => {
    return await Taro.request({
      url: `${ROOT_URL}/api/order/${type}?user=${openid}`,
      method: 'GET',
    })
};

export const submitEventOrder = async (eventOrder) => {
  return await Taro.request({
    url: `${ROOT_URL}/api/order/event`,
    method: 'POST',
    data: {
      eventOrder
    }
  })
}