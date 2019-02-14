const express = require('express');
const { getAllPrinters, getPrinter } = require('../controllers/printerController');

const printerRouter = express.Router();

printerRouter.get('/', getAllPrinters);
printerRouter.get('/:printerid', getPrinter);

module.exports = printerRouter;
