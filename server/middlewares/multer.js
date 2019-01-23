const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/');
  },
  filename: (req, file, cb) => {
    cb(null, `event_${Date.now()}.${file.mimetype}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
