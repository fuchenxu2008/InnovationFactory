const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { APPSECRET } = require('../config');

const getToken = ({ headers, query }) => {
  let token = headers.authorization || query.token || ''; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  return token;
};

const authenticateUser = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: 'Auth token is not supplied' });
  return jwt.verify(token, APPSECRET, (err, decoded) => {
    // decoded = { openid, session_key }
    if (err) return res.status(401).json({ message: 'Token is not valid' });
    const { openid } = decoded;
    return User.findOne({ openid }, (err2, user) => {
      if (err2) return res.status(400).json({ message: 'Error while finding user', err: err2 });
      if (!user) return res.status(401).json({ message: 'No user related' });
      req.user = user;
      return next();
    });
  });
};

const authenticateAdmin = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: 'Auth token is not supplied' });
  return jwt.verify(token, APPSECRET, (err, decoded) => {
    // decoded = { openid, session_key }
    if (err) return res.status(401).json({ message: 'Token is not valid' });
    const { openid } = decoded;
    return User.findOne({ openid }, (err2, user) => {
      if (err2) return res.status(400).json({ message: 'Error while finding user', err: err2 });
      if (!user) return res.status(401).json({ message: 'No user related' });
      if (user.role !== 'admin') return res.status(401).json({ message: 'Not administrator!' });
      req.user = user;
      return next();
    });
  });
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
