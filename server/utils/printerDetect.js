const moment = require('moment-timezone');
const PrinterOrder = require('../models/PrinterOrder');
const readJSON = require('./readJSON');

const isPrinterFree = (printer = {}, timeSlot) => new Promise(async (resolve, reject) => {
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

const generateTimeSlots = async (printer = {}, existingOrders = []) => {
  const { available, hours } = await readJSON('config/timeslots.json');
  const { open } = available;

  const dates = [].concat(...open.map(({ weekStart, weekDays }) => weekDays.map(weekDay => moment(weekStart).day(weekDay).format('YYYY-MM-DD'))));

  // // Generate all available time slots
  const timeSlots = dates.reduce((acc, date) => ({
    ...acc,
    [date]: hours,
  }), {});
  // // Parse all relavant orders (given printer) => order status { datetime: num }
  const orderStatus = existingOrders.reduce((acc, order) => {
    const orderDate = order.timeSlot.split(' ')[0];
    return {
      ...acc,
      [orderDate]: (acc[orderDate] || 0) + 1,
    };
  }, {});
  // // filter out unavailable slots
  Object.keys(orderStatus).forEach((occupiedDate) => {
    if (orderStatus[occupiedDate] >= printer.quantity) {
      if (timeSlots[occupiedDate]) delete timeSlots[occupiedDate];
    }
  });
  return timeSlots;
};

module.exports = {
  generateTimeSlots,
  isPrinterFree,
};
