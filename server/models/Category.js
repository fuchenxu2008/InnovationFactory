const mongoose = require('mongoose');
const moment = require('moment-timezone');

const CategorySchema = mongoose.Schema({
  name: String,
  bannerImage: String, // Banner image path
  type: String, // Event or Workshop
  created_at: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
