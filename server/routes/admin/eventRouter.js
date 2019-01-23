const express = require('express');
const { addEvent } = require('../../controllers/admin/eventController');
const upload = require('../../middlewares/multer');

const eventRouter = express.Router();

eventRouter.post('/', upload.single('file'), addEvent);

module.exports = eventRouter;
