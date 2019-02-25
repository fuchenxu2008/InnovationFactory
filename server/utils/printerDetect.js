const moment = require('moment-timezone');
const PrinterOrder = require('../models/PrinterOrder');
const { preset } = require('../config/timeslots');

// 2019-01-31 11:00-12:00
const hasConflict = (timeA, timeB) => {
  const [dateA, intervalA] = timeA.split(' ');
  const [dateB, intervalB] = timeB.split(' ');
  if (!dateA === dateB) return false;
  if (!intervalA === intervalB) return false;
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

const generateTimeSlots = (printer, existingOrders, skip = 1, days = 14) => {
  // Skip 2 days and future 14 days
  const startDate = moment().add(skip, 'days');
  const dates = [...new Array(days)].map(() => {
    const date = startDate.add(1, 'day');
    while (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
      date.add(1, 'day');
    }
    return date.format('YYYY-MM-DD');
  });
  // Generate all available time slots
  const timeSlots = dates.reduce((acc, date) => ({
    ...acc,
    [date]: preset,
  }), {});
  // Parse all relavant orders (given printer) => order status { datetime: num }
  const orderStatus = existingOrders.reduce((acc, order) => ({
    ...acc,
    [order.timeSlot]: (acc[order.timeSlot] || 0) + 1,
  }), {});
  // filter out unavailable slots
  Object.keys(orderStatus).forEach((occupiedTime) => {
    if (orderStatus[occupiedTime] >= printer.quantity) {
      const [date, interval] = occupiedTime.split(' ');
      timeSlots[date] = timeSlots[date].filter(time => interval !== time);
    }
  });
  return timeSlots;
};

module.exports = {
  generateTimeSlots,
  hasConflict,
  isPrinterFree,
};

// Find all printer orders => find out in what period are what printer unavailble
