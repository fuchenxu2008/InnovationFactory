const express = require('express');
const {
  getDemands,
  getMyDemands,
  getDemand,
  createDemand,
  updateDemand,
  completeDemand,
  deleteDemand,
} = require('../controllers/demandController');
const { authenticateUser } = require('../middlewares/authentication');

const demandController = express.Router();

demandController.get('/', getDemands);
demandController.get('/my', authenticateUser, getMyDemands);
demandController.get('/:id', getDemand);
demandController.post('/', authenticateUser, createDemand);
demandController.put('/:id', authenticateUser, updateDemand);
demandController.put('/complete/:id', authenticateUser, completeDemand);
demandController.delete('/:id', authenticateUser, deleteDemand);

module.exports = demandController;
