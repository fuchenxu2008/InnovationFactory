const express = require('express');
const { login, updateUserInfo } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authentication');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/user', authenticateUser, updateUserInfo);

module.exports = authRouter;
