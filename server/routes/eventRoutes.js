const express = require('express');
const { getAllEvents, getEvent } = require('../controllers/eventController');
// const {} = require('../controllers/');

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents);
eventRouter.get('/:eventid', getEvent);
// eventRouter.get('/', )

module.exports = eventRouter;
