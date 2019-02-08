const mongoose = require('mongoose');
const moment = require('moment-timezone');

const UserSchema = mongoose.Schema({
  /**
   * WeChat Related
   */
  session_key: String,
  openid: String,
  /**
   * Administrator Indentifier
   */
  role: {
    type: String,
    default: 'user',
  },
  /**
   * Optional Privacy Info
   */
  userInfo: {
    nickName: String,
    gender: Number,
    city: String,
    language: String,
    province: String,
    country: String,
    avatarUrl: String,
  },
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
