const WorkshopOrder = require('../../models/WorkshopOrder');

const getWorkshopOrders = (req, res) => {
  const searchTerm = {};
  const { workshop, user } = req.query;
  if (workshop) searchTerm.workshop = workshop;
  if (user) searchTerm.user = user;
  WorkshopOrder.find(searchTerm, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting all workshopOrders', err });
    return res.json({ orders: docs, searchTerm });
  });
};

const getWorkshopOrder = (req, res) => {
  const { orderid } = req.params;
  WorkshopOrder.findById(orderid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting workshopOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No workshopOrder found with this ID.' });
    return res.json({ order: doc });
  });
};

module.exports = {
  getWorkshopOrders,
  getWorkshopOrder,
};
