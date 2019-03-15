import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getInitialWorkshops = () => {
  return request({
    url: `${ROOT_URL}/api/activity/workshop`,
    method: 'GET',
  })
}

export const getPaginatedWorkshops = ({ start, count = 3, category }) => {
  return request({
    url: `${ROOT_URL}/api/activity/workshop?start=${start}&count=${count}&category=${category}`,
    method: 'GET',
  })
}

export const getWorkshop = (workshopid) => {
  return request({
    url: `${ROOT_URL}/api/activity/workshop/${workshopid}`,
    method: 'GET',
  })
}

/**
 * Admin APIs
 */

export const addWorkshop = (workshop, token) => {
    return multipartRequest({
      url: `${ROOT_URL}/api/admin/activity/workshop`,
      filePath: workshop.albumPicPath,
      name: 'file',
      formData: {
        workshop: JSON.stringify(workshop)
      },
      token: token,
    });
}

export const updateWorkshop = ({id, workshop}, token) => {
  if (workshop.albumPicPath.startsWith(ROOT_URL)) {
    // Update without changing cover photo
    return request({
      url: `${ROOT_URL}/api/admin/activity/workshop/${id}`,
      method: 'PUT',
      data: { workshop },
      token,
    })
  } else {
    // Re-upload photo
    return multipartRequest({
      url: `${ROOT_URL}/api/admin/activity/workshop/${id}`,
      filePath: workshop.albumPicPath,
      name: 'file',
      formData: {
        workshop: JSON.stringify(workshop),
      },
      token,
    });
  }
}

export const deleteWorkshop = (workshopid, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/activity/workshop/${workshopid}`,
    method: 'DELETE',
    token,
  })
}