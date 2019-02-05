import { request } from '../utils/request';
import { ROOT_URL } from '../config';

export const getMyOrders = (type, token) => {
    return request({
      url: `${ROOT_URL}/api/myorder/${type}`,
      method: 'GET',
      token,
    })
};

export const submitEventOrder = (eventOrder, token) => {
  return request({
    url: `${ROOT_URL}/api/myorder/event`,
    method: 'POST',
    data: { eventOrder },
    token,
  })
}