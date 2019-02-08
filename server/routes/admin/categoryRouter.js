const express = require('express');
const {
  addCategory,
  deleteCategory,
  updateCategoryWithImage,
  updateCategoryWithoutImage,
} = require('../../controllers/admin/categoryController');
const { categoryUpload } = require('../../middlewares/multer');

const categoryRouter = express.Router();

categoryRouter.post('/', categoryUpload.single('file'), addCategory);
categoryRouter.delete('/:categoryid', deleteCategory);
categoryRouter.put('/:categoryid', updateCategoryWithoutImage);
categoryRouter.post('/:categoryid', categoryUpload.single('file'), updateCategoryWithImage);

module.exports = categoryRouter;
