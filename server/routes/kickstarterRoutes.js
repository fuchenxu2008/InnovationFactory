const express = require('express');
const {
  getKickstarters,
  getMyKickstarters,
  getKickstarter,
  createKickstarter,
  updateKickstarter,
  completeKickstarter,
  deleteKickstarter,
} = require('../controllers/kickstarterController');
const { authenticateUser } = require('../middlewares/authentication');

const kickstarterRouter = express.Router();

kickstarterRouter.get('/', getKickstarters);
kickstarterRouter.get('/my', authenticateUser, getMyKickstarters);
kickstarterRouter.get('/:id', getKickstarter);
kickstarterRouter.post('/', authenticateUser, createKickstarter);
kickstarterRouter.put('/:id', authenticateUser, updateKickstarter);
kickstarterRouter.put('/complete/:id', authenticateUser, completeKickstarter);
kickstarterRouter.delete('/:id', authenticateUser, deleteKickstarter);

module.exports = kickstarterRouter;
