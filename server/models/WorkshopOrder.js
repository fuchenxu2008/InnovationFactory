const mongoose = require('mongoose');
const moment = require('moment-timezone');

const WorkshopOrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * WorkshopOrder Form
   */
  form: Object,
  /**
   * Used to send message to user
   */
  formId: [{ type: String }],
  /**
   * Order Detail
   */
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
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

const WorkshopOrder = mongoose.model('WorkshopOrder', WorkshopOrderSchema);

module.exports = WorkshopOrder;
