import { request } from '../utils/request';
import { ROOT_URL } from '../config';

export const getDemands = () => {
  return request({
    url: `${ROOT_URL}/api/demand`,
    method: 'GET',
  })
}

export const getDemand = (id) => {
  return request({
    url: `${ROOT_URL}/api/demand/${id}`,
    method: 'GET',
  })
}

export const createDemand = (demand, token) => {
  return request({
    url: `${ROOT_URL}/api/demand`,
    method: 'POST',
    data: demand,
    token
  })
}

export const updateDemand = (demandId, data, token) => {
  return request({
    url: `${ROOT_URL}/api/demand/${demandId}`,
    method: 'PUT',
    data,
    token,
  })
}

export const deleteDemand = (demandId, token) => {
  return request({
    url: `${ROOT_URL}/api/demand/${demandId}`,
    method: 'DELETE',
    token,
  })
}


/**
 * admin
 */
export const getAllDemands = (token) => {
  return request({
    url: `${ROOT_URL}/api/admin/demand`,
    method: 'GET',
    token,
  })
}

export const approveDemand = (demandId, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/demand/approve/${demandId}`,
    method: 'PUT',
    data: { approved: true },
    token,
  })
}
