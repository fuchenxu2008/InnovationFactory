const EventOrder = require('../models/EventOrder');

const createEventOrder = (req, res) => {
  const { eventOrder } = req.body;
  EventOrder.create(eventOrder, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating eventOrder', err });
    return res.json({ message: 'Successfully created eventOrder!', eventOrder: doc });
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
