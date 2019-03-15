const json2xls = require('json2xls');
const sendMail = require('../middlewares/email');
const ActivityOrder = require('../models/ActivityOrder');
const { sendOrderSuccessNotification } = require('./notificationController');
const { sendScheduledReminder } = require('../utils/cronJobs/activityReminder');

const createActivityOrder = (req, res) => {
  const { type } = req.params;
  const { order } = req.body;
  ActivityOrder.create({
    ...order,
    type,
  })
    .then(newOrder => ActivityOrder.findById(newOrder._id)
      .populate('activity')
      .populate('user', 'openid')
      .then((doc) => {
        sendOrderSuccessNotification({ order: doc, activity: doc.activity });
        sendScheduledReminder({ order: doc, activity: doc.activity });
        res.json({ message: `Successfully created ${type}Order!`, order: newOrder });
      }))
    .catch((err) => {
      res.status(400).json({
        message: `Error while creating ${type}Order`,
        err,
      });
      throw new Error(err);
    });
};

const getMyActivityOrders = (req, res) => {
  const { type } = req.params;
  const { user } = req;
  if (!user) return res.status(400).json({ message: `No user provided while getting my ${type}Orders` });
  return ActivityOrder.find({ user: user._id, type })
    .populate('activity', ['title', 'albumPicPath'])
    .sort({ created_at: -1 })
    .then(docs => res.json({ myOrders: docs }))
    .catch(err => res.status(400).json({ message: `Error while getting my ${type}Orders.`, err }));
};

const getMyActivityOrder = (req, res) => {
  const { type, orderid } = req.params;
  ActivityOrder.findById(orderid).populate('user', '_id')
    .then((doc) => {
      if (!doc) return res.status(404).json({ message: `No ${type}Order found with this ID.` });
      if (doc.user._id !== req.user._id) return res.status(401).json({ message: 'Permission denied (ownership mismatch)' });
      return res.json({ [`${type}Order`]: doc });
    })
    .catch(err => res.status(400).json({
      message: `Error while getting ${type}Order.`,
      err,
    }));
};

/**
 * Admin Functions
 */

const getActivityOrders = (req, res) => {
  const { type } = req.params;
  const searchTerm = { type };
  const { activity, user, toExcel } = req.query;
  if (activity) searchTerm.activity = activity;
  if (user) searchTerm.user = user;
  ActivityOrder.find(searchTerm)
    .sort({ created_at: -1 })
    .select('-__v -formId -user -tickets -type -_id')
    .populate('activity', '-_id title')
    .lean()
    .exec((err, orders) => {
      if (err) return res.status(400).json({ message: `Error while getting all ${type}Orders`, err });
      const formattedOrders = orders.map((order) => {
        const { form, ...otherInfo } = order;
        const relatedActivity = order.activity || {};
        return {
          ...form,
          ...otherInfo,
          activity: relatedActivity.title,
        };
      });
      if (toExcel === '1') {
        sendMail('fuchenxu2008@163.com', json2xls(formattedOrders));
      }
      return res.json({ orders: formattedOrders, searchTerm });
    });
};

const getActivityOrder = (req, res) => {
  const { type, orderid } = req.params;
  ActivityOrder.findById(orderid, (err, doc) => {
    if (err) return res.status(400).json({ message: `Error while getting ${type}Order.`, err });
    if (!doc) return res.status(404).json({ message: `No ${type}Order found with this ID.` });
    return res.json({ order: doc });
  });
};

module.exports = {
  createActivityOrder,
  getMyActivityOrders,
  getMyActivityOrder,
  // admin
  getActivityOrders,
  getActivityOrder,
};
