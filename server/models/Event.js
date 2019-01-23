const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  title: String,
  desc: String,
  startTime: String,
  endTime: String,
  address: {
    text: String,
    coordinate: String,
  },
  signupFrom: String,
  signupTo: String,
  cancellable: Boolean,
  tickets: [{
    type: String,
    fee: String,
    quota: Number,
  }], // More types of tickets
  linkToArticle: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
