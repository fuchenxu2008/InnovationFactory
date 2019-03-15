const Activity = require('../models/Activity');
const Printer = require('../models/Printer');

const searchDatabase = async (req, res) => {
  const { q, type } = req.query;
  if (!q) return res.status(400).json({ message: 'No search term provided' });
  const searchText = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  try {
    const result = {};
    if (!type || type === 'event') {
      const events = await Activity.find({ type: 'event' })
        .or([{ title: searchText }, { subtitle: searchText }, { desc: searchText }])
        .select(['_id', 'title', 'subtitle', 'albumPicPath', 'startTime']);
      result.events = events;
    }
    if (!type || type === 'workshop') {
      const workshops = await Activity.find({ type: 'workshop' })
        .or([{ title: searchText }, { subtitle: searchText }, { desc: searchText }])
        .select(['_id', 'title', 'subtitle', 'albumPicPath', 'startTime']);
      result.workshops = workshops;
    }
    if (!type || type === 'printer') {
      const printers = await Printer.find()
        .or([{ type: searchText }, { consumables: searchText }, { class: searchText }])
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
