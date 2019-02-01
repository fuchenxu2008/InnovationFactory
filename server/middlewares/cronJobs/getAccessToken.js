const axios = require('axios');
const schedule = require('node-schedule');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const { APPID, APPSECRET, validBefore } = require('../../config');

const getAccessToken = async () => {
  const { data } = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`);
  if (data.access_token) {
    fs.writeFile(path.join(global.__root, 'config/accessToken.json'), JSON.stringify({
      access_token: data.access_token,
      validBefore: dayjs().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    }), (err) => {
      if (err) console.log('Update access_token error:', err);
      else console.log('access_token updated!');
    });
  }
};

const recurUpdateToken = () => {
  getAccessToken();
  // Refresh every 1.9 hour
  setTimeout(recurUpdateToken, 1000 * 60 * 60 * 1.9);
};

const accessTokenManager = () => {
  // Manage the initial start time of updating
  const startTime = dayjs(validBefore).isBefore(dayjs())
    ? dayjs().add(1, 'second').format('YYYY-MM-DD HH:mm:ss')
    : validBefore;
  schedule.scheduleJob(startTime, recurUpdateToken);
};

module.exports = accessTokenManager;
