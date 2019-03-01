const express = require('express');
const { searchDatabase } = require('../controllers/searchController');

const searchRouter = express.Router();

searchRouter.get('/', searchDatabase);

module.exports = searchRouter;
