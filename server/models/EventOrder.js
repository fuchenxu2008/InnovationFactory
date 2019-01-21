const mongoose = require('mongoose');

const EventOrderSchema = mongoose.Schema({
  /**
   * WeChat User Identifier
   */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  /**
   * EventOrder Form
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
