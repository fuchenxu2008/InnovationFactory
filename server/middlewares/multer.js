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

const eventUpload = multer({ storage: eventStorage });
const workshopUpload = multer({ storage: workshopStorage });
const printerUpload = multer({ storage: printerStorage });
const categoryUpload = multer({ storage: categoryStorage });

module.exports = {
  eventUpload,
  workshopUpload,
  printerUpload,
  categoryUpload,
};
