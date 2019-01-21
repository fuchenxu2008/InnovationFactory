const express = require('express');

const eventRouter = express.Router();

eventRouter.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body.event);
});

module.exports = eventRouter;
