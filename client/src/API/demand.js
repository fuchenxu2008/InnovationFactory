import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getDemands = () => {
  return request({
    url: `${ROOT_URL}/api/demand`,
    method: 'GET',
  })
}

export const getMyDemands = (token) => {
  return request({
    url: `${ROOT_URL}/api/demand/my`,
    method: 'GET',
    token
  })
}

export const getDemand = (id) => {
  return request({
    url: `${ROOT_URL}/api/demand/${id}`,
    method: 'GET',
  })
}

export const createDemand = async (demand, token) => {
  if (demand.imgUrls && demand.imgUrls.length) {
    const imgRes = await Promise.all(demand.imgUrls.map(imgUrl => multipartRequest({
      url: `${ROOT_URL}/api/image`,
      filePath: imgUrl,
      name: 'userImg',
      token: token
    })));
    demand.imgUrls = imgRes.map(res => res.data);
  }
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

export const completeDemand = (demandId, token) => {
  return request({
    url: `${ROOT_URL}/api/demand/complete/${demandId}`,
    method: 'PUT',
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
