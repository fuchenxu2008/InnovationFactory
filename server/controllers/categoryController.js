const Category = require('../models/Category');

const getAllCategories = (req, res) => {
  const searchTerm = req.query;
  Category.find(searchTerm, (err, categories) => {
    if (err) return res.status(400).json({ message: 'Error while getting all categories.', err });
    return res.json({ categories, searchTerm });
  });
};

const getCategory = (req, res) => {
  const { categoryid } = req.params;
  if (!categoryid) return res.status(400).json({ message: 'No ID provided while getting category.' });
  return Category.findById(categoryid, (err, category) => {
    if (err) return res.status(400).json({ message: 'Error while getting category.', err });
    if (!category) return res.status(404).json({ message: 'No category found with this ID.' });
    return res.json({ category });
  });
};

module.exports = {
  getAllCategories,
  getCategory,
};
