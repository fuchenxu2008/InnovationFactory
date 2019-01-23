const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `event_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
