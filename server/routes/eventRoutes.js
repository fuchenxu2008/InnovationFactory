const express = require('express');
const { getAllEvents, getEvent } = require('../controllers/eventController');

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents);
eventRouter.get('/:eventid', getEvent);

module.exports = eventRouter;
