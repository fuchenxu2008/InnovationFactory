const Printer = require('../models/Printer');

const getAllPrinters = (req, res) => {
  const searchTerm = req.query;
  Printer.find(searchTerm, (err, printers) => {
    if (err) return res.status(400).json({ message: 'Error while getting all printers.', err });
    return res.json({ printers, searchTerm });
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
