const mongoose = require('mongoose');
const moment = require('moment-timezone');

const DemandSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrls: [String],
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: Number,
  },
  claimed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  approved: Boolean,
});

const Demand = mongoose.model('Demand', DemandSchema);

module.exports = Demand;
