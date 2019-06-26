const express = require('express');
const {
  getKickstarters,
  approveKickstarter,
  deleteKickstarter,
} = require('../../controllers/kickstarterController');

const kickstarterRouter = express.Router();

kickstarterRouter.get('/', getKickstarters);
kickstarterRouter.put('/approve/:id', approveKickstarter);
kickstarterRouter.delete('/:id', deleteKickstarter);

module.exports = kickstarterRouter;
