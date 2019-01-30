const express = require('express');
const {
  addEvent,
  deleteEvent,
  updateEventWithImage,
  updateEventWithoutImage,
} = require('../../controllers/admin/eventController');
const upload = require('../../middlewares/multer');

const eventRouter = express.Router();

eventRouter.post('/', upload.single('file'), addEvent);
eventRouter.delete('/:eventid', deleteEvent);
eventRouter.put('/:eventid', updateEventWithoutImage);
eventRouter.post('/:eventid', upload.single('file'), updateEventWithImage);

module.exports = eventRouter;
