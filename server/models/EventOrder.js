const mongoose = require('mongoose');
const dayjs = require('dayjs');

const EventOrderSchema = mongoose.Schema({
  /**
   * WeChat User Identifier
   */
  user: String,
  /**
   * EventOrder Form
   */
  form: Object,
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
    default: dayjs().format('YYYY-MM-DD HH:mm'),
  },
});

const EventOrder = mongoose.model('EventOrder', EventOrderSchema);

module.exports = EventOrder;
