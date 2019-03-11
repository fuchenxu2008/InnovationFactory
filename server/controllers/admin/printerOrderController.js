const PrinterOrder = require('../../models/PrinterOrder');

const getPrinterOrders = (req, res) => {
  const searchTerm = {};
  const { printer, user } = req.query;
  if (printer) searchTerm.printer = printer;
  if (user) searchTerm.user = user;
  PrinterOrder.find(searchTerm)
    .sort({ created_at: -1 })
    .exec((err, docs) => {
      if (err) return res.status(400).json({ message: 'Error while getting all printerOrders', err });
      return res.json({ orders: docs, searchTerm });
    });
};

const getPrinterOrder = (req, res) => {
  const { orderid } = req.params;
  PrinterOrder.findById(orderid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting printerOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No printerOrder found with this ID.' });
    return res.json({ order: doc });
  });
};

module.exports = {
  getPrinterOrders,
  getPrinterOrder,
};
