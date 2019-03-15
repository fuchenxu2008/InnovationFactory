const express = require('express');
const { permitAdminAcess } = require('../../controllers/manageController');

const manageRouter = express.Router();

// Entrance permission for admin page
manageRouter.get('/auth', permitAdminAcess);

module.exports = manageRouter;
