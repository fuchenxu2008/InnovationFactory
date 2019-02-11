import { request, multipartRequest } from '../utils/request';
import { ROOT_URL } from '../config';

export const getAllCategories = () => {
  return request({
    url: `${ROOT_URL}/api/category`,
    method: 'GET',
  })
}

export const getCategory = (categoryid) => {
  return request({
    url: `${ROOT_URL}/api/category/${categoryid}`,
    method: 'GET',
  })
}

/**
 * Admin APIs
 */

export const addCategory = (category, token) => {
  return multipartRequest({
    url: `${ROOT_URL}/api/admin/category`,
    filePath: category.albumPicPath,
    name: 'file',
    formData: {
      category: JSON.stringify(category)
    },
    token: token,
  });
}

export const updateCategory = ({ id, category }, token) => {
  if (category.albumPicPath.startsWith(ROOT_URL)) {
    // Update without changing cover photo
    return request({
      url: `${ROOT_URL}/api/admin/category/${id}`,
      method: 'PUT',
      data: { category },
      token,
    })
  } else {
    // Re-upload photo
    return multipartRequest({
      url: `${ROOT_URL}/api/admin/category/${id}`,
      filePath: category.albumPicPath,
      name: 'file',
      formData: {
        category: JSON.stringify(category),
      },
      token,
    });
  }
}

export const deleteCategory = (categoryid, token) => {
  return request({
    url: `${ROOT_URL}/api/admin/category/${categoryid}`,
    method: 'DELETE',
    token,
  })
}