const moment = require('moment-timezone');
const PrinterOrder = require('../models/PrinterOrder');

const hasConflict = (timeA, timeB) => {
  const [dateA, intervalA] = timeA.split(' ');
  const [dateB, intervalB] = timeB.split(' ');
  if (!moment(dateA).isSame(dateB)) return false;
  const [startA, endA] = intervalA.split('-');
  const [startB, endB] = intervalB.split('-');
  if (!moment(endA, 'HH:mm').isAfter(moment(startB, 'HH:mm')) || !moment(endB, 'HH:mm').isAfter(moment(startA, 'HH:mm'))) return false;
  return true;
};

const isPrinterFree = (printer, timeSlot) => new Promise(async (resolve, reject) => {
  let existingOrders;
  try {
    existingOrders = await PrinterOrder.find({ printer: printer._id });
  } catch (error) {
    reject(error);
  }
  const occupiedNum = existingOrders
    .filter(existingOrder => hasConflict(existingOrder.timeSlot, timeSlot))
    .length;
  resolve((printer.quantity || 0) - occupiedNum > 0);
});

const generateTimeSlots = (days) => {
  
};

module.exports = {
  hasConflict,
  isPrinterFree,
};

// Find all printer orders => find out in what period are what printer unavailble
