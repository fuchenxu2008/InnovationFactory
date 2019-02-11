const adminRouter = require('./admin');
const authRouter = require('./authRoutes');
const eventRouter = require('./eventRoutes');
const workshopRouter = require('./workshopRoutes');
const categoryRouter = require('./categoryRoutes');
const orderRouter = require('./orderRoutes');
const { authenticateAdmin, authenticateUser } = require('../middlewares/authentication');
const { getImage } = require('../controllers/assetController');

module.exports = (app) => {
  // admin
  app.use('/api/admin', authenticateAdmin, adminRouter);
  // user
  app.use('/api/auth', authRouter);
  app.use('/api/event', eventRouter);
  app.use('/api/workshop', workshopRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/myorder', authenticateUser, orderRouter);
  app.get('/api/image/:img', getImage);
};
