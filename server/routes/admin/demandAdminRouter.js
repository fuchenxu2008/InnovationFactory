const express = require('express');
const {
  getDemands,
  approveDemand,
  deleteDemand,
} = require('../../controllers/demandController');

const demandController = express.Router();

demandController.get('/', getDemands);
demandController.put('/approve/:id', approveDemand);
demandController.delete('/:id', deleteDemand);

module.exports = demandController;
