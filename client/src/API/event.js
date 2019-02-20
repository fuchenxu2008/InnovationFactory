import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getInitialEvents = () => {
  return request({
    url: `${ROOT_URL}/api/event`,
    method: 'GET',
  })
}

export const getPaginatedEvents = ({ start, count = 3, category }) => {
  return request({
    url: `${ROOT_URL}/api/event?start=${start}&count=${count}&category=${category}`,
    method: 'GET',
  })
}

export const getEvent = (eventid) => {
  return request({
    url: `${ROOT_URL}/api/event/${eventid}`,
    method: 'GET',
  })
}

/**
 * Admin APIs
 */

export const addEvent = (event, token) => {
    return multipartRequest({
      url: `${ROOT_URL}/api/admin/event`,
      filePath: event.albumPicPath,
      name: 'file',
      formData: {
        event: JSON.stringify(event)
      },
      token: token,
    });
}

export const updateEvent = ({id, event}, token) => {
  if (event.albumPicPath.startsWith(ROOT_URL)) {
    // Update without changing cover photo
    return request({
      url: `${ROOT_URL}/api/admin/event/${id}`,
      method: 'PUT',
      data: { event },
      token,
    })
  } else {
    // Re-upload photo
    return multipartRequest({
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

export const deleteEvent = (eventid, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/event/${eventid}`,
    method: 'DELETE',
    token,
  })
}