const {
  username,
  password,
  host,
  port,
  database,
} = require('./db');

module.exports = {
  port: process.env.PORT || 4896,
  mongoURL: `mongodb://${username}:${password}@${host}:${port}/${database}`,
};
