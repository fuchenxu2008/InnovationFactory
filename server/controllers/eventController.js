const Event = require('../models/Event');
const Category = require('../models/Category');

const getAllEvents = (req, res) => {
  // If no query variables => app initial load, return 3 from each category
  if (Object.keys(req.query).length === 0) {
    return Category.find({ type: 'event' }).sort({ updated_at: -1 }).exec(async (err, categories) => {
      if (err) return res.status(400).json({ message: 'Error while getting all categories.', err });
      const events = await categories.reduce(async (previousPromise, category) => {
        const obj = await previousPromise;
        try {
          return {
            ...obj,
            [category._id]: await Event.find({ category: category._id })
              .limit(3)
              .populate('category', ['name', '_id'])
              .sort({ created_at: -1 }),
          };
        } catch (error) {
          return res.status(400).json({ message: 'Error while getting initial events.', err: error });
        }
      }, Promise.resolve({}));
      return res.json({ events, categories, message: 'Successfully retrieved 3 events from each category.' });
    });
  }
  // If has query, return as requested (default all)
  const { start, count, ...searchTerm } = req.query;
  return Event.find(searchTerm)
    .skip(start * 1 || 0)
    .limit(count * 1 || 0)
    .populate('category', ['name', '_id'])
    .sort({ created_at: -1 })
    .exec((err, events) => {
      if (err) return res.status(400).json({ message: 'Error while getting filtered events.', err });
      return res.json({ events, searchTerm });
    });
};

const getEvent = (req, res) => {
  const { eventid } = req.params;
  if (!eventid) return res.status(400).json({ message: 'No ID provided while getting event.' });
  return Event.findById(eventid).populate('category', ['name', '_id']).exec((err, event) => {
    if (err) return res.status(400).json({ message: 'Error while getting event.', err });
    if (!event) return res.status(404).json({ message: 'No event found with this ID.' });
    return res.json({ event });
  });
};

module.exports = {
  getAllEvents,
  getEvent,
};
