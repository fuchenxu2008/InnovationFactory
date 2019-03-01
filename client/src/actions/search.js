import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
} from '../constants/search';
import * as api from '../API/search';

// eslint-disable-next-line
export const searchDatabase = ({ q, type = '' }) => (dispatch) => {
  dispatch({
    type: SEARCH_REQUEST
  });
  return new Promise((resolve, reject) => {
    api.searchDatabase({ q, type })
    .then(({ data }) => {
      console.log(data);
      if (data) {
        dispatch({
          type: SEARCH_SUCCESS,
          payload: data,
        })
        resolve(data);
      }
    })
    .catch(err => {
        console.log(err);
        reject(err);
    })
  });
}