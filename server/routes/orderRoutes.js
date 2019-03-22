const express = require('express');
const {
  createActivityOrder, getMyActivityOrders, getMyActivityOrder, cancelMyActivityOrder,
} = require('../controllers/activityOrderController');
const {
  createPrinterOrder, getMyPrinterOrders, getMyPrinterOrder, cancelMyPrinterOrder,
} = require('../controllers/printerOrderController');

const orderRouter = express.Router();

orderRouter.get('/printer/:orderid', getMyPrinterOrder);
orderRouter.get('/printer', getMyPrinterOrders);
orderRouter.post('/printer', createPrinterOrder);
orderRouter.delete('/printer/:orderid', cancelMyPrinterOrder);

orderRouter.get('/:type/:orderid', getMyActivityOrder);
orderRouter.get('/:type', getMyActivityOrders);
orderRouter.post('/:type', createActivityOrder);
orderRouter.delete('/:type/:orderid', cancelMyActivityOrder);

module.exports = orderRouter;
