const Workshop = require('../models/Workshop');

const getAllWorkshops = (req, res) => {
  const searchTerm = req.query;
  Workshop.find(searchTerm, (err, docs) => {
    if (err) return res.status(400).json({ message: 'Error while getting all workshops.', err });
    return res.json({ workshops: docs, searchTerm });
  });
};

const getWorkshop = (req, res) => {
  const { workshopid } = req.params;
  if (!workshopid) return res.status(400).json({ message: 'No ID provided while getting workshop.' });
  return Workshop.findById(workshopid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting workshop.', err });
    if (!doc) return res.status(404).json({ message: 'No workshop found with this ID.' });
    return res.json({ workshop: doc });
  });
};

module.exports = {
  getAllWorkshops,
  getWorkshop,
};
