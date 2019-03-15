const mongoose = require('mongoose');
const moment = require('moment-timezone');

const ActivityOrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * ActivityOrder Form
   */
  form: Object,
  /**
   * Used to send message to user
   */
  formId: [{ type: String }],
  /**
   * Order Detail
   */
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
  },
  type: String, // 'event' or 'workshop'
  tickets: [{
    type: String,
    quantity: Number,
  }],
  transactionAmount: Number,
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const ActivityOrder = mongoose.model('ActivityOrder', ActivityOrderSchema);

module.exports = ActivityOrder;
