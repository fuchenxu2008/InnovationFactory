const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  /**
   * WeChat Related
   */
  session_key: String,
  openid: String,
  /**
   * Privacy Info
   */
  nickName: String,
  gender: String,
  city: String,
  avatarUrl: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
