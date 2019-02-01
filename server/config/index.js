const {
  username,
  password,
  host,
  port,
  database,
} = require('./db');
const { access_token, validBefore } = require('./accessToken');

module.exports = {
  port: process.env.PORT || 4896,
  mongoURL: `mongodb://${username}:${password}@${host}:${port}/${database}`,
  APPID: 'wxdb862090658cbe67',
  APPSECRET: '768bd38f02eca17cf805acf659497722',
  access_token,
  validBefore,
};
