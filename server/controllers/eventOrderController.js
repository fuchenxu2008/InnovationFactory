const EventOrder = require('../models/EventOrder');
const Event = require('../models/Event');
const { sendOrderSuccessNotification } = require('./notificationController');
const { sendScheduledReminder } = require('../middlewares/cronJobs');

const createEventOrder = (req, res) => {
  const { eventOrder } = req.body;
  EventOrder.create(eventOrder, (err, order) => {
    if (err) return res.status(400).json({ message: 'Error while creating eventOrder', err });
    res.json({ message: 'Successfully created eventOrder!', eventOrder: order });
    return Event.findById(order.event, (err2, event) => {
      if (err2) return console.log('Error while retrieving eventOrder related event', err);
      sendOrderSuccessNotification({ order, activity: event });
      return sendScheduledReminder({ order, activity: event });
    });
  });
};

const getMyEventOrder = (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ message: 'No user openid provided while getting my eventOrders' });
  return EventOrder.find({ user }, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting my eventOrders.', err });
    return res.json({ myOrders: docs });
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
