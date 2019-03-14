const json2xls = require('json2xls');
const PrinterOrder = require('../../models/PrinterOrder');
const sendMail = require('../../middlewares/email');

const getPrinterOrders = (req, res) => {
  const searchTerm = {};
  const { printer, user, toExcel } = req.query;
  if (printer) searchTerm.printer = printer;
  if (user) searchTerm.user = user;
  PrinterOrder.find(searchTerm)
    .sort({ created_at: -1 })
    .select('-_id -__v -formId -user')
    .populate('printer', '-_id type class')
    .lean()
    .exec((err, orders) => {
      if (err) return res.status(400).json({ message: 'Error while getting all printerOrders', err });
      if (toExcel === '1') {
        const xls = json2xls(orders.map((order) => {
          const { form, ...otherInfo } = order;
          return {
            ...form,
            ...otherInfo,
            printer: `${order.printer.type}${order.printer.class}`,
          };
        }));
        sendMail('fuchenxu2008@163.com', xls);
      }
      return res.json({ orders, searchTerm });
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
