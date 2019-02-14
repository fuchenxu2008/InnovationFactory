const mongoose = require('mongoose');
const moment = require('moment-timezone');

const PrinterOrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * PrinterOrder Form
   */
  form: Object,
  /**
   * Used to send message to user
   */
  formId: [{ type: String }],
  /**
   * Order Detail
   */
  printer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Printer',
  },
  timeSlot: String,
  guidance: String,
  transactionAmount: Number,
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const PrinterOrder = mongoose.model('PrinterOrder', PrinterOrderSchema);

module.exports = PrinterOrder;
