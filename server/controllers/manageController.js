const moment = require('moment-timezone');

const permitAdminAcess = (req, res) => {
  if (req.user) {
    return res.json({
      adminAccessBefore: moment().add(2, 'hour').format('YYYY/MM/DD HH:mm:ss'),
      message: 'Authenticate success, permission granted!',
    });
  }
  return res.status(401).json({ message: 'Permission denied.' });
};

module.exports = {
  permitAdminAcess,
};
