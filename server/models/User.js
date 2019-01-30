const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  /**
   * WeChat Related
   */
  session_key: String,
  openid: String,
  /**
   * Optional, for form auto filling
   */
  // name: String,
  // gender: String,
  // age: Number,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
