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
  name: String,
  gender: String,
  age: Number,
  phone: String,
  email: String,
  studentID: String,
  grade: String,
  major: String,
  IdNumber: String,
  company: String,
  school: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
