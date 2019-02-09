const EventOrder = require('../../models/EventOrder');

const getEventOrders = (req, res) => {
  const searchTerm = {};
  const { event, user } = req.query;
  if (event) searchTerm.event = event;
  if (user) searchTerm.user = user;
  EventOrder.find(searchTerm, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting all eventOrders', err });
    return res.json({ orders: docs, searchTerm });
  });
};

const getEventOrder = (req, res) => {
  const { orderid } = req.params;
  EventOrder.findById(orderid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting eventOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No eventOrder found with this ID.' });
    return res.json({ order: doc });
  });
};

module.exports = {
  getEventOrders,
  getEventOrder,
};
