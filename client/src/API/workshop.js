import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getAllWorkshops = () => {
  return request({
    url: `${ROOT_URL}/api/workshop`,
    method: 'GET',
  })
}

export const getWorkshop = (workshopid) => {
  return request({
    url: `${ROOT_URL}/api/workshop/${workshopid}`,
    method: 'GET',
  })
}

/**
 * Admin APIs
 */

export const addWorkshop = (workshop, token) => {
    return multipartRequest({
      url: `${ROOT_URL}/api/admin/workshop`,
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
      url: `${ROOT_URL}/api/admin/workshop/${id}`,
      method: 'PUT',
      data: { workshop },
      token,
    })
  } else {
    // Re-upload photo
    return multipartRequest({
      url: `${ROOT_URL}/api/admin/workshop/${id}`,
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
    url: `${ROOT_URL}/api/admin/workshop/${workshopid}`,
    method: 'DELETE',
    token,
  })
}