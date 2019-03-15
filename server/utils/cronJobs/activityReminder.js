const moment = require('moment-timezone');
const schedule = require('node-schedule');
const ActivityOrder = require('../../models/ActivityOrder');
const Activity = require('../../models/Activity');
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
   * Find future activities
   */
  Activity.find({
    startTime: {
      $gt: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
  }, (err, futureActivities) => {
    if (err) console.log('Error while finding all future activities', err);
    futureActivities.forEach((futureActivity) => {
      ActivityOrder.find({ activity: futureActivity._id }).populate('user', 'openid').exec((err2, orders) => {
        if (err2) console.log('Error while finding all orders for future activities', err2);
        orders.forEach((order) => {
          sendScheduledReminder({ activity: futureActivity, order });
        });
      });
    });
  });
};

module.exports = {
  sendScheduledReminder,
  registerAllReminderTasks,
};
