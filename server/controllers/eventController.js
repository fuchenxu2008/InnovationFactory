const Event = require('../models/Event');
const Category = require('../models/Category');

const getAllEvents = (req, res) => {
  const searchTerm = req.query;
  Event.find(searchTerm, (err, events) => {
    if (err) return res.status(400).json({ message: 'Error while getting all events.', err });
    return Category.find({ type: 'event' }, (err2, categories) => {
      if (err2) return res.status(400).json({ message: 'Error while getting all categories.', err: err2 });
      return res.json({ events, categories, searchTerm });
    });
  });
};

const getEvent = (req, res) => {
  const { eventid } = req.params;
  if (!eventid) return res.status(400).json({ message: 'No ID provided while getting event.' });
  return Event.findById(eventid, (err, event) => {
    if (err) return res.status(400).json({ message: 'Error while getting event.', err });
    if (!event) return res.status(404).json({ message: 'No event found with this ID.' });
    return res.json({ event });
  });
};

module.exports = {
  getAllEvents,
  getEvent,
};
