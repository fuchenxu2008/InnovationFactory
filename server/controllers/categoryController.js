const fs = require('fs');
const path = require('path');
const Category = require('../models/Category');

const getAllCategories = (req, res) => {
  const searchTerm = req.query;
  Category.find(searchTerm).sort({ updated_at: -1 }).exec((err, categories) => {
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

/**
 * Admin Functions
 */

const addCategory = (req, res) => {
  let category;
  try {
    category = JSON.parse(req.body.category);
  } catch (err) {
    return res.status(400).json({ message: 'Error while creating category.', err });
  }
  const { filename } = req.file || {};
  if (!category || !filename) return res.status(400).json({ message: 'Missing info while creating category.' });
  return Category.create({
    ...category,
    albumPicPath: `/api/image/${filename}`,
  }, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating category.', err });
    return res.json({ message: 'Successfully created category!', category: doc });
  });
};

const deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.params.categoryid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while deleting category.', err });
    if (!doc) return res.status(404).json({ message: 'Could not find category with specified _id' });
    res.json({ message: 'Successfully deleted category!', category: doc });
    // Remove picture attached to the category
    const pathArr = doc.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    return fs.unlink(path.join(global.__root, `storage/category/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
  });
};

const updateCategoryWithImage = (req, res) => {
  let editedCategory;
  try {
    editedCategory = JSON.parse(req.body.category);
  } catch (err) {
    return res.status(400).json({ message: 'Error while parsing category.', err });
  }
  const { filename } = req.file || {};
  const { categoryid } = req.params;
  if (!editedCategory || !filename || !categoryid) return res.status(400).json({ message: 'Missing info while updating category.' });
  return Category.findById(categoryid, (err, category) => {
    if (err) return res.status(400).json({ message: 'Error while finding category before updating.', err });
    // Remove old picture attached to the category
    const pathArr = category.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    fs.unlink(path.join(global.__root, `storage/category/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
    // Update category
    category.set({
      ...editedCategory,
      albumPicPath: `/api/image/${filename}`,
    });
    return category.save((err2, updatedCategory) => {
      if (err2) return res.status(400).json({ message: 'Error while finding category before updating.', err: err2 });
      return res.json({ message: 'Successfully updated category!', category: updatedCategory });
    });
  });
};

const updateCategoryWithoutImage = (req, res) => {
  const editedCategory = req.body.category;
  if (!req.params.categoryid || !editedCategory) return res.status(400).json({ message: 'Incomplete info while updating category.' });
  // restore image's full http url to api path
  const pathArr = editedCategory.albumPicPath.split('/');
  const filename = pathArr[pathArr.length - 1];
  return Category.findById(req.params.categoryid, (err, category) => {
    if (err) return res.status(400).json({ message: 'Error while finding category before updating.', err });
    category.set({
      ...editedCategory,
      albumPicPath: `/api/image/${filename}`,
    });
    return category.save((err2, updatedCategory) => {
      if (err2) return res.status(400).json({ message: 'Error while updating category.', err: err2 });
      if (!updatedCategory) return res.status(404).json({ message: 'Could not find category with specified _id' });
      return res.json({ message: 'Successfully updated category!', category: updatedCategory });
    });
  });
};

module.exports = {
  getAllCategories,
  getCategory,
  // admin
  addCategory,
  deleteCategory,
  updateCategoryWithImage,
  updateCategoryWithoutImage,
};
