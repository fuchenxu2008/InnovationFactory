const express = require('express');
const { getCategory, getAllCategories } = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:categoryid', getCategory);

module.exports = categoryRouter;
