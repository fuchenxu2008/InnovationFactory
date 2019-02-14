const express = require('express');
const manageRouter = require('./manageRouter');
const eventRouter = require('./eventRouter');
const workshopRouter = require('./workshopRouter');
const categoryRouter = require('./categoryRouter');
const printerRouter = require('./printerRouter');
const orderRouter = require('./orderRouter');

const adminRouter = express.Router();

adminRouter.use('/event', eventRouter);
adminRouter.use('/workshop', workshopRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/printer', printerRouter);
adminRouter.use('/order', orderRouter);
adminRouter.use('/manage', manageRouter);

module.exports = adminRouter;
