const express = require('express');
const {
  addEvent,
  deleteEvent,
  updateEventWithImage,
  updateEventWithoutImage,
} = require('../../controllers/admin/eventController');
const { eventUpload } = require('../../middlewares/multer');

const eventRouter = express.Router();

eventRouter.post('/', eventUpload.single('file'), addEvent);
eventRouter.delete('/:eventid', deleteEvent);
eventRouter.put('/:eventid', updateEventWithoutImage);
eventRouter.post('/:eventid', eventUpload.single('file'), updateEventWithImage);

module.exports = eventRouter;
