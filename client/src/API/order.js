import request from '../utils/request';
import { ROOT_URL } from '../config';

export const getMyOrders = async (type, token) => {
    return await request({
      url: `${ROOT_URL}/api/myorder/${type}`,
      method: 'GET',
      token,
    })
};

export const submitEventOrder = async (eventOrder, token) => {
  return await request({
    url: `${ROOT_URL}/api/myorder/event`,
    method: 'POST',
    data: { eventOrder },
    token,
  })
}