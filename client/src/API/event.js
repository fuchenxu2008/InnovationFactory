import Taro from '@tarojs/taro';
import { ROOT_URL } from '../config';

export const getAllEvents = async() => {
  return await Taro.request({
    url: `${ROOT_URL}/api/event`,
    method: 'GET',
  })
}

export const addEvent = async(event) => {
    return await Taro.uploadFile({
      url: `${ROOT_URL}/api/admin/event`,
      filePath: event.albumPicPath,
      name: 'file',
      formData: {
        event: JSON.stringify(event)
      }
    });
}

export const a = 1;