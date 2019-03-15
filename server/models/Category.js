const mongoose = require('mongoose');
const moment = require('moment-timezone');

const CategorySchema = mongoose.Schema({
  name: String,
  desc: String,
  albumPicPath: String, // Banner image path
  type: String, // 'event' or 'workshop'
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  updated_at: String, // Sort category by latest activity
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
