const express = require('express');
const {
  getDemands,
  createDemand,
  updateDemand,
  deleteDemand,
} = require('../controllers/demandController');
const { authenticateUser } = require('../middlewares/authentication');

const demandController = express.Router();

demandController.get('/', getDemands);
demandController.post('/', authenticateUser, createDemand);
demandController.put('/:id', authenticateUser, updateDemand);
demandController.delete('/:id', authenticateUser, deleteDemand);

module.exports = demandController;
