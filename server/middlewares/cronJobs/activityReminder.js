const dayjs = require('dayjs');
const schedule = require('node-schedule');
const { sendReminder } = require('../../controllers/notificationController');
const EventOrder = require('../../models/EventOrder');
const Event = require('../../models/Event');

/**
 * Run each time when an order is created
 */
const sendScheduledReminder = ({ order, activity }) => {
  schedule.scheduleJob(
    dayjs(activity.startTime).subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
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
      $gt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
  }, (err, futureEvents) => {
    if (err) console.log('Error while finding all future events', err);
    futureEvents.forEach((futureEvent) => {
      EventOrder.find({ event: futureEvent._id }, (err2, orders) => {
        if (err2) console.log('Error while finding all orders for future event', err);
        orders.forEach((order) => {
          schedule.scheduleJob(
            dayjs(futureEvent.startTime).subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
            () => sendScheduledReminder({ activity: futureEvent, order }),
          );
        });
      });
    });
  });
};

module.exports = {
  sendScheduledReminder,
  registerAllReminderTasks,
};
