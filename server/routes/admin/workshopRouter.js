const express = require('express');
const {
  addWorkshop,
  deleteWorkshop,
  updateWorkshopWithImage,
  updateWorkshopWithoutImage,
} = require('../../controllers/admin/workshopController');
const { workshopUpload } = require('../../middlewares/multer');

const workshopRouter = express.Router();

workshopRouter.post('/', workshopUpload.single('file'), addWorkshop);
workshopRouter.delete('/:workshopid', deleteWorkshop);
workshopRouter.put('/:workshopid', updateWorkshopWithoutImage);
workshopRouter.post('/:workshopid', workshopUpload.single('file'), updateWorkshopWithImage);

module.exports = workshopRouter;
