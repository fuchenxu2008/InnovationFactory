import Taro from '@tarojs/taro';
import { ROOT_URL } from '../config';

export const addEvent = async(event) => {
    console.log('event: ', event);
    return await Taro.request({
        url: `${ROOT_URL}/api/admin/event`,
        method: 'POST',
        data: { event }
    })
}

export const a = 1;