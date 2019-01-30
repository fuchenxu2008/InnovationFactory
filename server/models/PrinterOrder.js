const mongoose = require('mongoose');

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
  created_at: String,
});

const PrinterOrder = mongoose.model('PrinterOrder', PrinterOrderSchema);

module.exports = PrinterOrder;
