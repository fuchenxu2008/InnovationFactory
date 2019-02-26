const express = require('express');
const { getAllPrinters, getPrinter } = require('../controllers/printerController');

const printerRouter = express.Router();

printerRouter.get('/', getAllPrinters);
printerRouter.get('/:printerid', getPrinter);
// printerRouter.get('/:printerid/timeslots', )

module.exports = printerRouter;
