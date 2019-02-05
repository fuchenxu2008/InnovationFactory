const mongoose = require('mongoose');

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
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
