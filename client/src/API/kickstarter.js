import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getKickstarters = () => {
  return request({
    url: `${ROOT_URL}/api/kickstarter`,
    method: 'GET'
  });
};

export const getKickstarter = id => {
  return request({
    url: `${ROOT_URL}/api/kickstarter/${id}`,
    method: 'GET'
  });
};

export const createKickstarter = async (kickstarter, token) => {
  if (kickstarter.imgUrls && kickstarter.imgUrls.length) {
    const imgRes = await Promise.all(kickstarter.imgUrls.map(imgUrl => multipartRequest({
      url: `${ROOT_URL}/api/image`,
      filePath: imgUrl,
      name: 'userImg',
      token: token
    })));
    kickstarter.imgUrls = imgRes.map(res => res.data);
  }
  return request({
    url: `${ROOT_URL}/api/kickstarter`,
    method: 'POST',
    data: kickstarter,
    token
  });
};

export const updateKickstarter = (kickstarterId, data, token) => {
  return request({
    url: `${ROOT_URL}/api/kickstarter/${kickstarterId}`,
    method: 'PUT',
    data,
    token
  });
};

export const deleteKickstarter = (kickstarterId, token) => {
  return request({
    url: `${ROOT_URL}/api/kickstarter/${kickstarterId}`,
    method: 'DELETE',
    token
  });
};

/**
 * admin
 */
export const getAllKickstarters = token => {
  return request({
    url: `${ROOT_URL}/api/admin/kickstarter`,
    method: 'GET',
    token
  });
};

export const approveKickstarter = (kickstarterId, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/kickstarter/approve/${kickstarterId}`,
    method: 'PUT',
    data: { approved: true },
    token
  });
};
