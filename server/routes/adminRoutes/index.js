const express = require('express');
const eventRouter = require('./eventRouter');

const adminRouter = express.Router();

adminRouter.use('/event', eventRouter);

module.exports = adminRouter;
