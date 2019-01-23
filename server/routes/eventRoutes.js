const express = require('express');
const { getAllEvents } = require('../controllers/eventController');

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents);

module.exports = eventRouter;
