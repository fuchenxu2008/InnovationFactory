const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  title: String,
  desc: String,
  signupPeriod: {
    from: String,
    to: String,
  },
  startTime: String,
  endTime: String,
  address: {
    text: String,
    coordinate: String,
  },
  cancellable: Boolean,
  tickets: [{
    type: String,
    fee: String,
    quota: Number,
  }], // More types of tickets
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
