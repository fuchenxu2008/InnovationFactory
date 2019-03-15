const express = require('express');
const { getActivities, getActivity } = require('../controllers/activityController');

const activityRouter = express.Router();

activityRouter.get('/:type', getActivities);
activityRouter.get('/:type/:id', getActivity);

module.exports = activityRouter;
