const express = require('express');
const { getImage, postImage } = require('../controllers/assetController');
const { userImgUpload } = require('../middlewares/multer');

const assetRouter = express.Router();

assetRouter.get('/:img', getImage);
assetRouter.post('/', userImgUpload.single('userImg'), postImage);

module.exports = assetRouter;
