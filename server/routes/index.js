const express = require('express');
const adminRouter = require('./admin');
const authRouter = require('./authRoutes');
const activityRouter = require('./activityRoutes');
const categoryRouter = require('./categoryRoutes');
const demandRouter = require('./demandRoutes');
const kickstarterRouter = require('./kickstarterRoutes');
const printerRouter = require('./printerRoutes');
const orderRouter = require('./orderRoutes');
const searchRouter = require('./searchRoutes');
const { getImage } = require('../controllers/assetController');
const { authenticateAdmin, authenticateUser } = require('../middlewares/authentication');

const router = express.Router();

// admin
router.use('/admin', authenticateAdmin, adminRouter);
// user
router.use('/auth', authRouter);
router.use('/activity', activityRouter);
router.use('/category', categoryRouter);
router.use('/printer', printerRouter);
router.use('/demand', demandRouter);
router.use('/kickstarter', kickstarterRouter);
router.use('/myorder', authenticateUser, orderRouter);
router.use('/search', searchRouter);
router.get('/image/:img', getImage);

module.exports = router;
