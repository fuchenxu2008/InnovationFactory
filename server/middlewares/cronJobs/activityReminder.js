const dayjs = require('dayjs');
const schedule = require('node-schedule');
const { sendTemplateMessage } = require('../../controllers/notificationController');
const EventOrder = require('../../models/EventOrder');
const Event = require('../../models/Event');

const sendScheduledReminder = ({ activity, order }) => {
  sendTemplateMessage({
    touser: order.user,
    template_id: 'YUwJMeOH6uzDpJEIWDKlW47LJrvADsvVQI_tLOtXHl4',
    form_id: order.formId, // need to change
    page: `/pages/EventDetailPage/index?id=${activity._id}`,
    data: {
      keyword1: {
        value: activity.title, // 服务项目
      },
      keyword2: {
        value: order._id, // 订单编号
      },
      keyword3: {
        value: activity.startTime, // 开始时间
      },
      keyword4: {
        value: activity.endTime, // 结束时间
      },
      keyword5: {
        value: activity.address, // 地址
      },
    },
  });
};

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
            dayjs(futureEvent.startTime).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
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
