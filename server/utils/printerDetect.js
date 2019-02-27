const moment = require('moment-timezone');
const PrinterOrder = require('../models/PrinterOrder');
const { preset } = require('../config/timeslots');

const isPrinterFree = (printer, timeSlot) => new Promise(async (resolve, reject) => {
  let existingOrders;
  try {
    existingOrders = await PrinterOrder.find({ printer: printer._id });
  } catch (error) {
    reject(error);
  }
  const occupiedNum = existingOrders
    .filter(existingOrder => existingOrder.timeSlot === timeSlot)
    .length;
  resolve((printer.quantity || 0) - occupiedNum > 0);
});

const generateTimeSlots = (printer, existingOrders, skip = 2, days = 14) => {
  // Skip 2 days and future 14 days
  const slotDate = moment().add(skip - 1, 'days');
  const dates = [...new Array(days)].map(() => {
    slotDate.add(1, 'day');
    while (slotDate.isoWeekday() === 6 || slotDate.isoWeekday() === 7) {
      slotDate.add(1, 'day');
    }
    return slotDate.format('YYYY-MM-DD');
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
      if (timeSlots[date]) timeSlots[date] = timeSlots[date].filter(time => interval !== time);
    }
  });
  return timeSlots;
};

module.exports = {
  generateTimeSlots,
  isPrinterFree,
};
