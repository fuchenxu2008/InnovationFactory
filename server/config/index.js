const {
  username,
  password,
  host,
  port,
  database,
} = require('./db');
const emailConfig = require('./email');

module.exports = {
  port: process.env.PORT || 4896,
  mongoURL: `mongodb://${username}:${password}@${host}:${port}/${database}`,
  APPID: 'wxdb862090658cbe67',
  APPSECRET: '768bd38f02eca17cf805acf659497722',
  emailConfig,
};

// user: 'postmaster@sandbox967d89a1ad1940dbacf4e96fff73dfdf.mailgun.org',
// pass: '73edffaf634c05e0e946f91d514b6697-de7062c6-e3cfe1c8'
