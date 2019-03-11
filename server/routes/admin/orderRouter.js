const express = require('express');
const { getEventOrders, getEventOrder } = require('../../controllers/admin/eventOrderController');
const { getWorkshopOrders, getWorkshopOrder } = require('../../controllers/admin/workshopOrderController');
const { getPrinterOrders, getPrinterOrder } = require('../../controllers/admin/printerOrderController');

const orderRouter = express.Router();

// Query: /event?event={eventid}&user={id}
orderRouter.get('/event', getEventOrders);
orderRouter.get('/event/:orderid', getEventOrder);

// Query: /workshop?workshop={workshopid}&user={id}
orderRouter.get('/workshop', getWorkshopOrders);
orderRouter.get('/workshop/:orderid', getWorkshopOrder);

// Query: /printer?printer={printerid}&user={id}
orderRouter.get('/printer', getPrinterOrders);
orderRouter.get('/printer/:orderid', getPrinterOrder);

module.exports = orderRouter;
