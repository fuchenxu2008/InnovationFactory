const axios = require('axios');
const jwt = require('jsonwebtoken');
const { APPID, APPSECRET } = require('../config');
const User = require('../models/User');

const login = async (req, res) => {
  // Get openid, session_key
  const { code } = req.body;
  const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
    params: {
      appid: APPID,
      secret: APPSECRET,
      js_code: code,
      grant_type: 'authorization_code',
    },
  });
  const { openid, session_key } = data;
  console.log('openid, session_key: ', openid, session_key);
  if (!openid || !session_key) return res.status(400).json({ message: 'openid or session_key missing' });
  // Create custom login token and relate to session_key and openID
  const token = jwt.sign({ openid, session_key }, APPSECRET);
  // Store to db
  return User.findOne({ openid }, (err, existingUser) => {
    if (err) return res.status(400).json({ message: 'Error while finding existing user', err });
    if (existingUser) {
      existingUser.set({ session_key });
      return existingUser.save((err2, updatedUser) => {
        if (err2) return res.status(400).json({ message: 'Error while updating existing user', err: err2 });
        return res.json({ _id: updatedUser._id, token, message: 'Login success.' });
      });
    }
    return User.create({ openid, session_key }, (err3, newUser) => {
      if (err3) return res.status(400).json({ message: 'Error while creating new user', err: err3 });
      return res.json({ _id: newUser._id, token, message: 'Login success.' });
    });
  });
};

module.exports = {
  login,
};
