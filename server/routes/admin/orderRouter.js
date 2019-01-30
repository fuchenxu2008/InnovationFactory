const express = require('express');
const { getEventOrders, getEventOrder } = require('../../controllers/admin/eventOrderController');

const orderRouter = express.Router();

// Query: /event?event={eventid}
orderRouter.get('/event', getEventOrders);
orderRouter.get('/event/:orderid', getEventOrder);

module.exports = orderRouter;
