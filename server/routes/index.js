const adminRouter = require('./admin');
const wechatRouter = require('./wechatRoutes');
const eventRouter = require('./eventRoutes');
const { getImage } = require('../controllers/assetController');

module.exports = (app) => {
  // admin
  app.use('/api/admin', adminRouter);
  // user
  app.use('/api/wechat', wechatRouter);
  app.use('/api/event', eventRouter);
  app.get('/api/image/:img', getImage);
};
