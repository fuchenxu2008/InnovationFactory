const express = require('express');
const { addEvent, deleteEvent } = require('../../controllers/admin/eventController');
const upload = require('../../middlewares/multer');

const eventRouter = express.Router();

eventRouter.post('/', upload.single('file'), addEvent);
eventRouter.delete('/:eventid', deleteEvent);

module.exports = eventRouter;
