const multer = require('multer');
const path = require('path');

const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/event/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `event_${Date.now()}${ext}`);
  },
});

const workshopStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/workshop/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `workshop_${Date.now()}${ext}`);
  },
});

const printerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/printer/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `printer_${Date.now()}${ext}`);
  },
});

const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/category/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `category_${Date.now()}${ext}`);
  },
});

const userImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/userImg/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `userImg_${Date.now()}${ext}`);
  },
});

exports.eventUpload = multer({ storage: eventStorage });
exports.workshopUpload = multer({ storage: workshopStorage });
exports.printerUpload = multer({ storage: printerStorage });
exports.categoryUpload = multer({ storage: categoryStorage });
exports.userImgUpload = multer({ storage: userImgStorage });
