const moment = require('moment-timezone');
const schedule = require('node-schedule');
const EventOrder = require('../../models/EventOrder');
const Event = require('../../models/Event');
const { sendReminder } = require('../../controllers/notificationController');

/**
 * Run each time when an order is created
 */
const sendScheduledReminder = ({ order, activity }) => {
  schedule.scheduleJob(
    moment(activity.startTime).subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
    () => sendReminder({ order, activity }),
  );
};

/**
 * Run on script startup (only once)
 */
const registerAllReminderTasks = () => {
  /**
   * Find future events
   */
  Event.find({
    startTime: {
      $gt: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
  }, (err, futureEvents) => {
    if (err) console.log('Error while finding all future events', err);
    futureEvents.forEach((futureEvent) => {
      EventOrder.find({ event: futureEvent._id }).populate('user', 'openid').exec((err2, orders) => {
        if (err2) console.log('Error while finding all orders for future event', err2);
        orders.forEach((order) => {
          sendScheduledReminder({ activity: futureEvent, order });
        });
      });
    });
  });
};

module.exports = {
  sendScheduledReminder,
  registerAllReminderTasks,
};
