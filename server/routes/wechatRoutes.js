const express = require('express');
const { login } = require('../controllers/wechatController');

const wechatRouter = express.Router();

wechatRouter.post('/login', login);

module.exports = wechatRouter;
