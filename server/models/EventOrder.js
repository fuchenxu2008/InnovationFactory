const mongoose = require('mongoose');

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
  created_at: String,
});

const EventOrder = mongoose.model('EventOrder', EventOrderSchema);

module.exports = EventOrder;
