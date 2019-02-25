const moment = require('moment-timezone');
const Printer = require('../models/Printer');
const PrinterOrder = require('../models/PrinterOrder');
const { generateTimeSlots } = require('../utils/printerDetect');

const getAllPrinters = (req, res) => {
  const searchTerm = req.query;
  PrinterOrder.find({
    timeSlot: { $gte: moment().format('YYYY-MM-DD') },
  }, (err, printerOrders) => {
    Printer.find(searchTerm, (err2, docs) => {
      if (err2) return res.status(400).json({ message: 'Error while getting all printers.', err: err2 });
      const printers = docs.map(printer => ({
        ...printer.toObject(),
        timeSlot: generateTimeSlots(
          printer,
          printerOrders.filter(order => order.printer.equals(printer._id)),
        ), // eslint-disable-line
      }));
      return res.json({ printers, searchTerm });
    });
  });
};

const getPrinter = (req, res) => {
  const { printerid } = req.params;
  if (!printerid) return res.status(400).json({ message: 'No ID provided while getting printer.' });
  return Printer.findById(printerid, (err, printer) => {
    if (err) return res.status(400).json({ message: 'Error while getting printer.', err });
    if (!printer) return res.status(404).json({ message: 'No printer found with this ID.' });
    return res.json({ printer });
  });
};

module.exports = {
  getAllPrinters,
  getPrinter,
};
