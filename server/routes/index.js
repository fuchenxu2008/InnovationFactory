const adminRouter = require('./admin');
const wechatRouter = require('./wechatRoutes');
const eventRouter = require('./eventRoutes');
const { getImage } = require('../controllers/assetController');

module.exports = (app) => {
  app.use('/api/admin', adminRouter);
  app.use('/api/wechat', wechatRouter);
  app.use('/api/event', eventRouter);
  app.get('/api/image/:img', getImage);
};
