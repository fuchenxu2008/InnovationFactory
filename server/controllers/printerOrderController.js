const moment = require('moment-timezone');
const PrinterOrder = require('../models/PrinterOrder');
const Printer = require('../models/Printer');
// const { sendOrderSuccessNotification } = require('./notificationController');
// const { sendScheduledReminder } = require('../middlewares/cronJobs/activityReminder');

const createPrinterOrder = async (req, res) => {
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

  /**
   * Util functions
   */
  const hasConflict = (timeA, timeB) => {
    const [dateA, intervalA] = timeA.split(' ');
    const [dateB, intervalB] = timeB.split(' ');
    if (!moment(dateA).isSame(dateB)) return false;
    const [startA, endA] = intervalA.split('-');
    const [startB, endB] = intervalB.split('-');
    if (moment(endA, 'HH:mm').isBefore(moment(startB, 'HH:mm')) || moment(endB, 'HH:mm').isBefore(moment(startA, 'HH:mm'))) return false;
    return true;
  };

  const isPrinterFree = (wantedPrinter, newOrder, existingOrders) => {
    const occupiedNum = existingOrders
      .filter(existingOrder => hasConflict(existingOrder.timeSlot, newOrder.timeSlot))
      .length;
    return (wantedPrinter.quantity || 0) - occupiedNum > 0;
  };

  const { order } = req.body;

  let printer;
  let orders;
  try {
    printer = await Printer.findById(order.printer);
    orders = await PrinterOrder.find({ printer: order.printer });
  } catch (err) {
    return res.status(400).json({ message: 'Error while finding printers and orders', err });
  }

  if (!isPrinterFree(printer, order, orders)) return res.status(400).json({ message: 'Printer occupied at that time, please try other timeslots.' });

  return PrinterOrder.create(order, (err, newOrder) => {
    if (err) return res.status(400).json({ message: 'Error while creating printerOrder', err });
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
};

const getMyPrinterOrder = (req, res) => {
  const { user } = req;
  if (!user) return res.status(400).json({ message: 'No user provided while getting my printerOrders' });
  return PrinterOrder.find({ user: user._id })
    .populate('printer', ['type', 'class', 'albumPicPath']).exec((err, docs) => {
      if (err) return res.status(400).json({ message: 'Error while getting my printerOrders.', err });
      return res.json({ myOrders: docs });
    });
};

const getPrinterOrder = (req, res) => {
  const { orderid } = req.params;
  PrinterOrder.findById(orderid).populate('user', '_id').exec((err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting printerOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No printerOrder found with this ID.' });
    if (doc.user._id !== req.user._id) return res.status(401).json({ message: 'Permission denied (ownership mismatch)' });
    return res.json({ printerOrder: doc });
  });
};

module.exports = {
  createPrinterOrder,
  getMyPrinterOrder,
  getPrinterOrder,
};
