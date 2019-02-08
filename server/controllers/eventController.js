const Event = require('../models/Event');

const getAllEvents = (req, res) => {
  const searchTerm = req.query;
  Event.find(searchTerm, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting all events.', err });
    return res.json({ events: docs, searchTerm });
  });
};

const getEvent = (req, res) => {
  const { eventid } = req.params;
  if (!eventid) return res.status(400).json({ message: 'No ID provided while getting event.' });
  return Event.findById(eventid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting event.', err });
    if (!doc) return res.status(404).json({ message: 'No event found with this ID.' });
    return res.json({ event: doc });
  });
};

module.exports = {
  getAllEvents,
  getEvent,
};
