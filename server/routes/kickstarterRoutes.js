const express = require('express');
const {
  getKickstarters,
  getKickstarter,
  createKickstarter,
  updateKickstarter,
  deleteKickstarter,
} = require('../controllers/kickstarterController');
const { authenticateUser } = require('../middlewares/authentication');

const kickstarterRouter = express.Router();

kickstarterRouter.get('/', getKickstarters);
kickstarterRouter.get('/:id', getKickstarter);
kickstarterRouter.post('/', authenticateUser, createKickstarter);
kickstarterRouter.put('/:id', authenticateUser, updateKickstarter);
kickstarterRouter.delete('/:id', authenticateUser, deleteKickstarter);

module.exports = kickstarterRouter;
