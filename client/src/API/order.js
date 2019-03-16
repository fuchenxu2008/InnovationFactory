import { request } from '../utils/request';
import { ROOT_URL } from '../config';

export const getMyOrders = (type, token) => {
    return request({
      url: `${ROOT_URL}/api/myorder/${type}`,
      method: 'GET',
      token,
    })
};

export const submitOrder = ({order, type}, token) => {
  return request({
    url: `${ROOT_URL}/api/myorder/${type}`,
    method: 'POST',
    data: { order },
    token,
  })
}

// Admin section
export const getAllUserOrders = (type, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/order/${type}`,
    method: 'GET',
    token,
  })
}
