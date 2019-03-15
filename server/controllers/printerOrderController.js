const json2xls = require('json2xls');
const sendMail = require('../middlewares/email');
const PrinterOrder = require('../models/PrinterOrder');
const Printer = require('../models/Printer');
const { isPrinterFree } = require('../utils/printerDetect');
// const { sendOrderSuccessNotification } = require('./notificationController');
// const { sendScheduledReminder } = require('../utils/cronJobs/activityReminder');

const createPrinterOrder = (req, res) => {
  /**
   * order = {
   *  user: id,
   *  form: Object,
   *  formId: array,
   *  printer: id,
   *  timeSlot: string,
   *  transactionAmount: Number,
   *  guidance: string,
   * }
   */
  const { order } = req.body;
  Printer.findById(order.printer, (err, printer) => {
    if (err) return res.status(400).json({ message: 'Error while getting printer info.', err });
    return isPrinterFree(printer, order.timeSlot)
      .then((isFree) => {
        if (!isFree) return res.status(400).json({ message: 'Printer occupied at that time, please try other timeslots.' });
        return PrinterOrder.create(order, (err2, newOrder) => {
          if (err) return res.status(400).json({ message: 'Error while creating printerOrder', err: err2 });
          return res.json({ message: 'Successfully created printerOrder!', order: newOrder });
          // return PrinterOrder.findById(newOrder._id)
          //   .populate('printer')
          //   .populate('user', 'openid')
          //   .exec((err2, doc) => {
          //     if (err2) return console.log('Error while populating printerOrder', err2);
          //     sendOrderSuccessNotification({ order: doc, activity: doc.printer });
          //     return sendScheduledReminder({ order: doc, activity: doc.printer });
          //   });
        });
      })
      .catch(err2 => res.status(400).json({ message: 'Error while getting my printerOrders.', err: err2 }));
  });
};

const getMyPrinterOrders = (req, res) => {
  const { user } = req;
  if (!user) return res.status(400).json({ message: 'No user provided while getting my printerOrders' });
  return PrinterOrder.find({ user: user._id })
    .populate('printer', ['type', 'class', 'albumPicPath'])
    .sort({ created_at: -1 })
    .exec((err, docs) => {
      if (err) return res.status(400).json({ message: 'Error while getting my printerOrders.', err });
      return res.json({ myOrders: docs });
    });
};

const getMyPrinterOrder = (req, res) => {
  const { orderid } = req.params;
  PrinterOrder.findById(orderid).populate('user', '_id').exec((err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting printerOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No printerOrder found with this ID.' });
    if (doc.user._id !== req.user._id) return res.status(401).json({ message: 'Permission denied (ownership mismatch)' });
    return res.json({ printerOrder: doc });
  });
};

/**
 * Admin Functions
 */

const getPrinterOrders = (req, res) => {
  const searchTerm = {};
  const { printer, user, toExcel } = req.query;
  if (printer) searchTerm.printer = printer;
  if (user) searchTerm.user = user;
  PrinterOrder.find(searchTerm)
    .sort({ created_at: -1 })
    .select('-__v -formId -user -_id')
    .populate('printer', '-_id type class')
    .lean()
    .exec((err, orders) => {
      if (err) return res.status(400).json({ message: 'Error while getting all printerOrders', err });
      const formattedOrders = orders.map((order) => {
        const { form, ...otherInfo } = order;
        const relatedPrinter = order.printer;
        return {
          ...form,
          ...otherInfo,
          printer: `${relatedPrinter.type} ${relatedPrinter.class}`,
        };
      });
      if (toExcel === '1') {
        sendMail('fuchenxu2008@163.com', json2xls(formattedOrders));
      }
      return res.json({ orders: formattedOrders, searchTerm });
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
  createPrinterOrder,
  getMyPrinterOrders,
  getMyPrinterOrder,
  // Admin
  getPrinterOrders,
  getPrinterOrder,
};
