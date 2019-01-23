const path = require('path');

const getImage = (req, res) => {
  try {
    res.sendFile(path.join(global.__root, `storage/${req.params.img}`));
  } catch (err) {
    console.log('err: ', err);
    res.status(400).send(err);
  }
};

module.exports = {
  getImage,
};
