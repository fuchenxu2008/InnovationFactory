const EventOrder = require('../models/EventOrder');
const { sendOrderSuccessNotification } = require('./notificationController');
const { sendScheduledReminder } = require('../middlewares/cronJobs/activityReminder');

const createEventOrder = (req, res) => {
  const { eventOrder } = req.body;
  EventOrder.create(eventOrder, (err, newOrder) => {
    if (err) return res.status(400).json({ message: 'Error while creating eventOrder', err });
    res.json({ message: 'Successfully created eventOrder!', eventOrder: newOrder });
    return EventOrder.findById(newOrder._id)
      .populate('event')
      .populate('user', 'openid')
      .exec((err2, order) => {
        if (err2) return console.log('Error while populating eventOrder', err2);
        sendOrderSuccessNotification({ order, activity: order.event });
        return sendScheduledReminder({ order, activity: order.event });
      });
  });
};

const getMyEventOrder = (req, res) => {
  const { user } = req;
  if (!user) return res.status(400).json({ message: 'No user provided while getting my eventOrders' });
  return EventOrder.find({ user: user._id }, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting my eventOrders.', err });
    return res.json({ myOrders: docs });
  });
};

const getEventOrder = (req, res) => {
  const { orderid } = req.params;
  EventOrder.findById(orderid).populate('user', '_id').exec((err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting eventOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No eventOrder found with this ID.' });
    if (doc.user._id !== req.user._id) return res.status(401).json({ message: 'Permission denied (ownership mismatch)' });
    return res.json({ eventOrder: doc });
  });
};

module.exports = {
  createEventOrder,
  getMyEventOrder,
  getEventOrder,
};
