const express = require('express');
const {
  addActivity,
  deleteActivity,
  updateActivityWithImage,
  updateActivityWithoutImage,
} = require('../../controllers/activityController');
const { eventUpload, workshopUpload } = require('../../middlewares/multer');

const activityAdminRouter = express.Router();

const activityUpload = (req, res, next) => {
  const { type } = req.params;
  if (type === 'event') return eventUpload.single('file')(req, res, next);
  if (type === 'workshop') return workshopUpload.single('file')(req, res, next);
  return res.status(404).json({ message: 'Invalid activity type' });
};

activityAdminRouter.post('/:type', activityUpload, addActivity);
activityAdminRouter.delete('/:type/:id', deleteActivity);
activityAdminRouter.put('/:type/:id', updateActivityWithoutImage);
activityAdminRouter.post('/:type/:id', activityUpload, updateActivityWithImage);

module.exports = activityAdminRouter;
