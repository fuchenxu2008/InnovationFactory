const express = require('express');
const { createEventOrder, getMyEventOrder, getEventOrder } = require('../controllers/eventOrderController');
const { createWorkshopOrder, getMyWorkshopOrder, getWorkshopOrder } = require('../controllers/workshopOrderController');
const { createPrinterOrder, getMyPrinterOrder, getPrinterOrder } = require('../controllers/printerOrderController');

const orderRouter = express.Router();

orderRouter.get('/event/:orderid', getEventOrder);
orderRouter.get('/event', getMyEventOrder);
orderRouter.post('/event', createEventOrder);

orderRouter.get('/workshop/:orderid', getWorkshopOrder);
orderRouter.get('/workshop', getMyWorkshopOrder);
orderRouter.post('/workshop', createWorkshopOrder);

orderRouter.get('/printer/:orderid', getPrinterOrder);
orderRouter.get('/printer', getMyPrinterOrder);
orderRouter.post('/printer', createPrinterOrder);

module.exports = orderRouter;
