const adminRouter = require('./admin');
const wechatRouter = require('./wechatRoutes');
const eventRouter = require('./eventRoutes');
const orderRouter = require('./orderRoutes');
const { authenticateAdmin, authenticateUser } = require('../middlewares/authentication');
const { getImage } = require('../controllers/assetController');

module.exports = (app) => {
  // admin
  app.use('/api/admin', authenticateAdmin, adminRouter);
  // user
  app.use('/api/wechat', wechatRouter);
  app.use('/api/event', eventRouter);
  app.use('/api/myorder', authenticateUser, orderRouter);
  app.get('/api/image/:img', getImage);
};
