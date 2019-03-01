const Event = require('../models/Event');
const Workshop = require('../models/Workshop');
const Printer = require('../models/Printer');

const searchDatabase = async (req, res) => {
  const { q, type } = req.query;
  if (!q) return res.status(400).json({ message: 'No search term provided' });
  const searchTerm = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  try {
    const result = {};
    if (!type || type === 'event') {
      const events = await Event.find()
        .or([{ title: searchTerm }, { subtitle: searchTerm }, { desc: searchTerm }])
        .select(['_id', 'title', 'subtitle', 'albumPicPath', 'desc']);
      result.events = events;
    }
    if (!type || type === 'workshop') {
      const workshops = await Workshop.find()
        .or([{ title: searchTerm }, { subtitle: searchTerm }, { desc: searchTerm }])
        .select(['_id', 'title', 'subtitle', 'albumPicPath', 'startTime']);
      result.workshops = workshops;
    }
    if (!type || type === 'printer') {
      const printers = await Printer.find()
        .or([{ type: searchTerm }, { consumables: searchTerm }, { class: searchTerm }])
        .select(['_id', 'type', 'consumables', 'class', 'albumPicPath']);
      result.printers = printers;
    }
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ message: 'Error while searching activities and printers', err });
  }
};

module.exports = {
  searchDatabase,
};
