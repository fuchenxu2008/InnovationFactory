import { request } from '../utils/request';
import { ROOT_URL } from '../config';

export const getAllPrinters = () => {
  return request({
    url: `${ROOT_URL}/api/printer`,
    method: 'GET',
  })
}

export const getPrinter = (printerid) => {
  return request({
    url: `${ROOT_URL}/api/printer/${printerid}`,
    method: 'GET',
  })
}

/**
 * admin
 */
export const getTimeSlots = (token) => {
  return request({
    url: `${ROOT_URL}/api/admin/printer/timeslots`,
    method: 'GET',
    token,
  })
}

/**
 * admin
 */
export const publishTimeSlots = (timeSlots, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/printer/timeslots`,
    method: 'PUT',
    data: { timeSlots },
    token,
  })
}
