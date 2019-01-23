const Event = require('../../models/Event');

const addEvent = (req, res) => {
  console.log(req.body.event);
  Event.find({}, (err, doc) => {
    console.log(err, doc);
  });
  res.send(req.body.event);
};

module.exports = {
  addEvent,
};
