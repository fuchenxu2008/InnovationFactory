const adminRouter = require('./admin');
const wechatRouter = require('./wechatRoutes');

module.exports = (app) => {
  app.use('/api/admin', adminRouter);
  app.use('/api/wechat', wechatRouter);
};
