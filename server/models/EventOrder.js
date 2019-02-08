const mongoose = require('mongoose');
const moment = require('moment-timezone');

const EventOrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * EventOrder Form
   */
  form: Object,
  /**
   * Used to send message to user
   */
  formId: [{ type: String }],
  /**
   * Order Detail
   */
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
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

const EventOrder = mongoose.model('EventOrder', EventOrderSchema);

module.exports = EventOrder;
