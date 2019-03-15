const express = require('express');
const { createActivityOrder, getMyActivityOrders, getMyActivityOrder } = require('../controllers/activityOrderController');
const { createPrinterOrder, getMyPrinterOrders, getMyPrinterOrder } = require('../controllers/printerOrderController');

const orderRouter = express.Router();

orderRouter.get('/printer/:orderid', getMyPrinterOrder);
orderRouter.get('/printer', getMyPrinterOrders);
orderRouter.post('/printer', createPrinterOrder);

orderRouter.get('/:type/:orderid', getMyActivityOrder);
orderRouter.get('/:type', getMyActivityOrders);
orderRouter.post('/:type', createActivityOrder);

module.exports = orderRouter;
