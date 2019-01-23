const axios = require('axios');
const { APPID, SECRET } = require('../config');

const login = async (req, res) => {
  // Update session_key
  const { code } = req.body;
  const { data } = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`);
  const { openid, session_key } = data;
  console.log('openid, session_key: ', openid, session_key);
  // Create custom login token and relate to session_key and openID
  // Store to db
  res.json({ openid, message: 'Login success.' });
};

module.exports = {
  login,
};
