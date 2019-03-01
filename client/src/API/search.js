import { request } from '../utils/request';
import { ROOT_URL } from '../config';

// eslint-disable-next-line
export const searchDatabase = ({ q, type }) => {
  return request({
    url: `${ROOT_URL}/api/search?type=${type}&q=${q}`,
    method: 'GET',
  })
}