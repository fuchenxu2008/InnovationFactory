const express = require('express');
const manageAdminRouter = require('./manageAdminRouter');
const activityAdminRouter = require('./activityAdminRouter');
const categoryAdminRouter = require('./categoryAdminRouter');
const printerAdminRouter = require('./printerAdminRouter');
const orderAdminRouter = require('./orderAdminRouter');

const adminRouter = express.Router();

adminRouter.use('/activity', activityAdminRouter);
adminRouter.use('/category', categoryAdminRouter);
adminRouter.use('/printer', printerAdminRouter);
adminRouter.use('/order', orderAdminRouter);
adminRouter.use('/manage', manageAdminRouter);

module.exports = adminRouter;
