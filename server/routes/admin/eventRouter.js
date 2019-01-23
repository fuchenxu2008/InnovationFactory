const express = require('express');
const { addEvent } = require('../../controllers/admin/eventController');

const eventRouter = express.Router();

eventRouter.post('/', addEvent);

module.exports = eventRouter;
