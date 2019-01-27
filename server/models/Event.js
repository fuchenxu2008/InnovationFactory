const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  albumPicPath: String,
  title: String,
  subTitle: String,
  desc: String,
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
    type: String,
    required: Boolean,
    _id: false,
  }],
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
