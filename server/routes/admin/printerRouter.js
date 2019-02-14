const express = require('express');
const {
  addPrinter,
  deletePrinter,
  updatePrinterWithImage,
  updatePrinterWithoutImage,
} = require('../../controllers/admin/printerController');
const { printerUpload } = require('../../middlewares/multer');

const printerRouter = express.Router();

printerRouter.post('/', printerUpload.single('file'), addPrinter);
printerRouter.delete('/:printerid', deletePrinter);
printerRouter.put('/:printerid', updatePrinterWithoutImage);
printerRouter.post('/:printerid', printerUpload.single('file'), updatePrinterWithImage);

module.exports = printerRouter;
