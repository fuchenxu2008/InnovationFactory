const express = require('express');
const eventRouter = require('./eventRouter');
const orderRouter = require('./orderRouter');

const adminRouter = express.Router();

adminRouter.use('/event', eventRouter);
adminRouter.use('/order', orderRouter);

module.exports = adminRouter;
