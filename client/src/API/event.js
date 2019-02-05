import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getAllEvents = async() => {
  return await request({
    url: `${ROOT_URL}/api/event`,
    method: 'GET',
  })
}

export const getEvent = async(eventid) => {
  return await request({
    url: `${ROOT_URL}/api/event/${eventid}`,
    method: 'GET',
  })
}

/**
 * Admin APIs
 */

export const addEvent = async(event, token) => {
    return await multipartRequest({
      url: `${ROOT_URL}/api/admin/event`,
      filePath: event.albumPicPath,
      name: 'file',
      formData: {
        event: JSON.stringify(event)
      },
      token: token,
    });
}

export const updateEvent = async ({id, event}, token) => {
  if (event.albumPicPath.startsWith(ROOT_URL)) {
    // Update without changing cover photo
    return await request({
      url: `${ROOT_URL}/api/admin/event/${id}`,
      method: 'PUT',
      data: { event },
      token,
    })
  } else {
    // Re-upload photo
    return await multipartRequest({
      url: `${ROOT_URL}/api/admin/event/${id}`,
      filePath: event.albumPicPath,
      name: 'file',
      formData: {
        event: JSON.stringify(event),
      },
      token,
    });
  }
}

export const deleteEvent = async(eventid, token) => {
  return await request({
    url: `${ROOT_URL}/api/admin/event/${eventid}`,
    method: 'DELETE',
    token,
  })
}