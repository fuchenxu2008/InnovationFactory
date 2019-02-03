const mongoose = require('mongoose');
const dayjs = require('dayjs');

const PrinterOrderSchema = mongoose.Schema({
  /**
   * WeChat User Identifier
   */
  user: String,
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
  timeSlot: {
    from: String,
    to: String,
  },
  transactionAmount: Number,
  created_at: {
    type: String,
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const PrinterOrder = mongoose.model('PrinterOrder', PrinterOrderSchema);

module.exports = PrinterOrder;
