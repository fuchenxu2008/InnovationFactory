const axios = require('axios');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const { APPID, APPSECRET } = require('../../config');
const readJSON = require('../../utils/readJSON');

const getAccessToken = async () => {
  const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`);
  return new Promise((resolve, reject) => {
    if (data.access_token) {
      fs.writeFile(path.join(global.__root, 'config/accessToken.json'), JSON.stringify({
        access_token: data.access_token,
        validBefore: moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      }), (err) => {
        if (err) {
          console.log('Update access_token error:', err);
          reject(err);
        } else {
          console.log('access_token updated!');
          resolve(data.access_token);
        }
      });
    } else reject();
  });
};

const recurUpdateToken = () => {
  getAccessToken();
  // Refresh every 1.9 hour
  setTimeout(recurUpdateToken, 1000 * 60 * 60 * 1.9);
};

const accessTokenManager = async () => {
  // Manage the initial start time of updating
  readJSON('../config/accessToken.json')
    .then(({ validBefore }) => {
      const startTime = moment(validBefore).isBefore(moment())
        ? moment().add(1, 'second').format('YYYY-MM-DD HH:mm:ss')
        : validBefore;
      schedule.scheduleJob(startTime, recurUpdateToken);
    })
    .catch((err) => {
      console.log('Error while running accessTokenManager', err);
      recurUpdateToken();
    });
};

module.exports = {
  getAccessToken,
  accessTokenManager,
};
