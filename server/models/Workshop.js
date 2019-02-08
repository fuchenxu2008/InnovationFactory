const mongoose = require('mongoose');
const moment = require('moment-timezone');

const WorkshopSchema = mongoose.Schema({
  albumPicPath: String,
  title: String,
  subtitle: String,
  desc: String,
  category: String,
  startTime: String,
  endTime: String,
  address: String,
  signupFrom: String,
  signupTo: String,
  acceptSignup: Boolean,
  cancellable: Boolean,
  tickets: [{
    ticketType: String,
    fee: Number,
    quota: Number,
    _id: false,
  }], // More types of tickets
  linkToArticle: String,
  formFields: [{
    field: String,
    fieldType: String,
    required: Boolean,
    _id: false,
  }],
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const Workshop = mongoose.model('Workshop', WorkshopSchema);

module.exports = Workshop;
