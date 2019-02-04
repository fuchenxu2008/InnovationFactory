import Taro from '@tarojs/taro';

const request = ({ url, method, token, data }) => {
  const options = { url, method };
  if (data) options.data = data;
  if (token) options.header = { 'Authorization': `Bearer ${token}` }
  return Taro.request(options);
}

export default request;