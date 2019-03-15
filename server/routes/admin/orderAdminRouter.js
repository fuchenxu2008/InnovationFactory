const express = require('express');
const { getActivityOrders, getActivityOrder } = require('../../controllers/activityOrderController');
const { getPrinterOrders, getPrinterOrder } = require('../../controllers/printerOrderController');

const orderRouter = express.Router();

// Query: /printer?printer={printerid}&user={id}
orderRouter.get('/printer', getPrinterOrders);
orderRouter.get('/printer/:orderid', getPrinterOrder);

// Query: /event?event={eventid}&user={id}
orderRouter.get('/:type', getActivityOrders);
orderRouter.get('/:type/:orderid', getActivityOrder);

module.exports = orderRouter;
