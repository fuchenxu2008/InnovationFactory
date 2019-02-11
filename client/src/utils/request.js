import Taro from '@tarojs/taro';

export const request = ({ url, method, token, data }) => {
  return new Promise((resolve, reject) => {
     const options = {
       url,
       method,
     };
     if (data) options.data = data;
     if (token) options.header = {
       'Authorization': `Bearer ${token}`
     }
     return Taro.request({
       ...options,
       success: (res) => {
         if (res.statusCode !== 200) return reject(res.data.message);
         resolve(res);
       },
       fail: (err) => reject(err),
     });
  });
}

export const multipartRequest = ({ url, filePath, name, formData, token, }) => {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      filePath,
      name, // file field name
    }
    if (formData) options.formData = formData;
    if (token) options.header = {
      'Authorization': `Bearer ${token}`
    }
    return Taro.uploadFile({
      ...options,
      success: (res) => {
        const data = JSON.parse(res.data);
        if (res.statusCode !== 200) return reject(data.message);
        resolve({ data });
      },
      fail: (err) => reject(err),
    })
  });
}
