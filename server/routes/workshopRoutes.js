const express = require('express');
const { getAllWorkshops, getWorkshop } = require('../controllers/workshopController');

const workshopRouter = express.Router();

workshopRouter.get('/', getAllWorkshops);
workshopRouter.get('/:workshopid', getWorkshop);

module.exports = workshopRouter;
