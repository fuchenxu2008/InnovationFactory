const mongoose = require('mongoose');

const PrinterOrderSchema = mongoose.Schema({
  /**
   * WeChat User Identifier
   */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * PrinterOrder Form
   */
  name: String,
  gender: String,
  age: Number,
  phone: String,
  email: String,
  studentID: String,
  grade: String,
  major: String,
  IdNumber: String,
  company: String,
  school: String,
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
