const Event = require('../models/Event');

const getAllEvents = (req, res) => {
  Event.find({}, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting all events.', err });
    return res.send(docs);
  });
};

module.exports = {
  getAllEvents,
};
