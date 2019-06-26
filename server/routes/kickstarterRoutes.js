const express = require('express');
const {
  getKickstarters,
  createKickstarter,
  updateKickstarter,
  deleteKickstarter,
} = require('../controllers/kickstarterController');
const { authenticateUser } = require('../middlewares/authentication');

const kickstarterRouter = express.Router();

kickstarterRouter.get('/', getKickstarters);
kickstarterRouter.post('/', authenticateUser, createKickstarter);
kickstarterRouter.put('/:id', authenticateUser, updateKickstarter);
kickstarterRouter.delete('/:id', authenticateUser, deleteKickstarter);

module.exports = kickstarterRouter;
