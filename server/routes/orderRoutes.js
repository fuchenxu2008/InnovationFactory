const express = require('express');
const { createEventOrder, getMyEventOrder, getEventOrder } = require('../controllers/eventOrderController');

const orderRouter = express.Router();

orderRouter.get('/event/:orderid', getEventOrder);
orderRouter.get('/event', getMyEventOrder);
orderRouter.post('/event', createEventOrder);

module.exports = orderRouter;
