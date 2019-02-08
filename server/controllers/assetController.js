const path = require('path');
const fs = require('fs');

const getImage = (req, res) => {
  const { img } = req.params;
  const dir = img.split('_')[0];
  const filePath = path.join(global.__root, `storage/${dir}/${img}`);
  fs.stat(filePath, (err) => {
    if (err) return res.status(404).json({ message: 'Resource not found!', err });
    return res.sendFile(filePath);
  });
};

module.exports = {
  getImage,
};
