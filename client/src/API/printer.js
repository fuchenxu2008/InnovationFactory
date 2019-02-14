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
