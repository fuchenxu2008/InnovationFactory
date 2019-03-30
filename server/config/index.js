const {
  username,
  password,
  host,
  port,
  database,
} = require('./db');

module.exports = {
  port: process.env.PORT || 4896,
  mongoURL: `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`,
  APPID: 'wxdb862090658cbe67',
  APPSECRET: '768bd38f02eca17cf805acf659497722',
};
