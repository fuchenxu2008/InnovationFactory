const axios = require('axios');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const { APPID, APPSECRET } = require('../../config');
const readJSON = require('../../utils/readJSON');
const generateConfig = require('../generateConfig');

const getAccessToken = () => new Promise(async (resolve, reject) => {
  try {
    const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`);
    if (data.access_token) {
      fs.writeFile(path.join(global.__root, 'config/accessToken.json'), JSON.stringify({
        access_token: data.access_token,
        validBefore: moment().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      }), (err) => {
        if (err) {
          console.log('Update access_token error:', err);
          throw err;
        } else {
          console.log('access_token updated!');
          resolve(data.access_token);
        }
      });
    } else throw new Error('No access token acquired');
  } catch (error) {
    reject(error);
  }
});

const recurUpdateToken = () => {
  getAccessToken();
  // Refresh every 2 hour
  setTimeout(recurUpdateToken, 1000 * 60 * 60 * 2);
};

const accessTokenManager = async () => {
  // Manage the initial start time of updating
  readJSON('config/accessToken.json')
    .then(({ validBefore }) => {
      if (!validBefore) return recurUpdateToken();
      const startTime = moment(validBefore).isBefore(moment())
        ? moment().add(1, 'second').format('YYYY-MM-DD HH:mm:ss')
        : validBefore;
      return schedule.scheduleJob(startTime, recurUpdateToken);
    })
    .catch(async (err) => {
      console.log('Error while running accessTokenManager', err);
      await generateConfig('accessToken');
      recurUpdateToken();
    });
};

module.exports = {
  getAccessToken,
  accessTokenManager,
};
