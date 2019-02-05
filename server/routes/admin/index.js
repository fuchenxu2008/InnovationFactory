const express = require('express');
const manageRouter = require('./manageRouter');
const eventRouter = require('./eventRouter');
const orderRouter = require('./orderRouter');

const adminRouter = express.Router();

adminRouter.use('/event', eventRouter);
adminRouter.use('/order', orderRouter);
adminRouter.use('/manage', manageRouter);

module.exports = adminRouter;
