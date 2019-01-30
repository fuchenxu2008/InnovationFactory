const mongoose = require('mongoose');
const dayjs = require('dayjs');

const EventSchema = mongoose.Schema({
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
    default: dayjs().format('YYYY-MM-DD HH:mm'),
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
