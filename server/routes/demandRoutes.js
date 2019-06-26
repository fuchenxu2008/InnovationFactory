const express = require('express');
const {
  getDemands,
  getDemand,
  createDemand,
  updateDemand,
  deleteDemand,
} = require('../controllers/demandController');
const { authenticateUser } = require('../middlewares/authentication');

const demandController = express.Router();

demandController.get('/', getDemands);
demandController.get('/:id', getDemand);
demandController.post('/', authenticateUser, createDemand);
demandController.put('/:id', authenticateUser, updateDemand);
demandController.delete('/:id', authenticateUser, deleteDemand);

module.exports = demandController;
