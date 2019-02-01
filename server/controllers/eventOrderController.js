const dayjs = require('dayjs');
const EventOrder = require('../models/EventOrder');
const Event = require('../models/Event');
const { sendTemplateMessage } = require('./notificationController');
const { sendScheduledReminder } = require('../middlewares/cronJobs');

const createEventOrder = (req, res) => {
  const { eventOrder } = req.body;
  EventOrder.create(eventOrder, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating eventOrder', err });
    res.json({ message: 'Successfully created eventOrder!', eventOrder: doc });
    return Event.findById(doc.event, (err2, event) => {
      if (err2) return console.log('Error while retrieving eventOrder related event', err);
      return sendScheduledReminder({ activity: event, order: doc });
    //   return sendTemplateMessage({
    //     template_id: 'PhaC1oBnNp7U-Tf8cE-C3SSPX0QVgWlnwhYno7cZTBA',
    //     touser: doc.user,
    //     form_id: doc.formId,
    //     page: `/pages/EventDetailPage/index?id=${event._id}`,
    //     data: {
    //       keyword1: {
    //         value: event.title,
    //       }, // 服务名称
    //       keyword2: {
    //         value: dayjs().format('YYYY-MM-DD HH:mm'), // 支付时间
    //       },
    //       keyword3: {
    //         value: '100万', // 订单金额
    //       },
    //       keyword4: {
    //         value: doc._id, // 单号
    //       },
    //       keyword5: {
    //         value: event.startTime, // 开始时间
    //       },
    //       keyword6: {
    //         value: event.address, // 地点
    //       },
    //     },
    //   });
    });
  });
};

const getMyEventOrder = (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ message: 'No user openid provided while getting my eventOrders' });
  return EventOrder.find({ user }, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting my eventOrders.', err });
    return res.json({ myEventOrders: docs });
  });
};

const getEventOrder = (req, res) => {
  const { orderid } = req.params;
  EventOrder.findById(orderid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting eventOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No eventOrder found with this ID.' });
    return res.json({ eventOrder: doc });
  });
};

module.exports = {
  createEventOrder,
  getMyEventOrder,
  getEventOrder,
};
