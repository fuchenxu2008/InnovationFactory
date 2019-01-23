const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  albumPicPath: String,
  title: String,
  desc: String,
  startTime: String,
  endTime: String,
  address: String,
  signupFrom: String,
  signupTo: String,
  cancellable: Boolean,
  tickets: [{
    ticketType: String,
    fee: Number,
    quota: Number,
    _id: false,
  }], // More types of tickets
  linkToArticle: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
