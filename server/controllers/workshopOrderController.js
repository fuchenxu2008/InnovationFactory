const WorkshopOrder = require('../models/WorkshopOrder');
const { sendOrderSuccessNotification } = require('./notificationController');
const { sendScheduledReminder } = require('../utils/cronJobs/activityReminder');

const createWorkshopOrder = (req, res) => {
  const { order } = req.body;
  WorkshopOrder.create(order, (err, newOrder) => {
    if (err) return res.status(400).json({ message: 'Error while creating workshopOrder', err });
    res.json({ message: 'Successfully created workshopOrder!', order: newOrder });
    return WorkshopOrder.findById(newOrder._id)
      .populate('workshop')
      .populate('user', 'openid')
      .exec((err2, doc) => {
        if (err2) return console.log('Error while populating workshopOrder', err2);
        sendOrderSuccessNotification({ order: doc, activity: doc.workshop });
        return sendScheduledReminder({ order: doc, activity: doc.workshop });
      });
  });
};

const getMyWorkshopOrder = (req, res) => {
  const { user } = req;
  if (!user) return res.status(400).json({ message: 'No user provided while getting my workshopOrders' });
  return WorkshopOrder.find({ user: user._id })
    .populate('workshop', ['title', 'albumPicPath'])
    .sort({ created_at: -1 })
    .exec((err, docs) => {
      if (err) return res.status(400).json({ message: 'Error while getting my workshopOrders.', err });
      return res.json({ myOrders: docs });
    });
};

const getWorkshopOrder = (req, res) => {
  const { orderid } = req.params;
  WorkshopOrder.findById(orderid).populate('user', '_id').exec((err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting workshopOrder.', err });
    if (!doc) return res.status(404).json({ message: 'No workshopOrder found with this ID.' });
    if (doc.user._id !== req.user._id) return res.status(401).json({ message: 'Permission denied (ownership mismatch)' });
    return res.json({ workshopOrder: doc });
  });
};

module.exports = {
  createWorkshopOrder,
  getMyWorkshopOrder,
  getWorkshopOrder,
};
