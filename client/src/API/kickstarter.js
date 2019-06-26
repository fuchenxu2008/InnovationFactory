import { request } from '../utils/request';
import { ROOT_URL } from '../config';

export const getAllApprovedKickstarters = () => {
  return request({
    url: `${ROOT_URL}/api/kickstarter`,
    method: 'GET'
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
