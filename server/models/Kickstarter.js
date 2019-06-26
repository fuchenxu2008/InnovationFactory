const mongoose = require('mongoose');
const moment = require('moment-timezone');

const KickstarterSchema = mongoose.Schema({
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
  imgUrl: [String],
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: Number,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  collectedAmount: {
    type: Number,
    default: 0,
  },
  validBefore: Date,
  achieved: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  approved: Boolean,
});

const Kickstarter = mongoose.model('Kickstarter', KickstarterSchema);

module.exports = Kickstarter;
