const adminRouter = require('./admin');
const authRouter = require('./authRoutes');
const eventRouter = require('./eventRoutes');
const workshopRouter = require('./workshopRoutes');
const categoryRouter = require('./categoryRoutes');
const printerRouter = require('./printerRoutes');
const orderRouter = require('./orderRoutes');
const searchRouter = require('./searchRoutes');
const { getImage } = require('../controllers/assetController');
const { authenticateAdmin, authenticateUser } = require('../middlewares/authentication');

module.exports = (app) => {
  // admin
  app.use('/api/admin', authenticateAdmin, adminRouter);
  // user
  app.use('/api/auth', authRouter);
  app.use('/api/event', eventRouter);
  app.use('/api/workshop', workshopRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/printer', printerRouter);
  app.use('/api/myorder', authenticateUser, orderRouter);
  app.use('/api/search', searchRouter);
  app.get('/api/image/:img', getImage);
};
