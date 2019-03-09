const Workshop = require('../models/Workshop');
const Category = require('../models/Category');

const getAllWorkshops = (req, res) => {
  // If no query variables => app initial load, return 3 from each category
  if (Object.keys(req.query).length === 0) {
    return Category.find({ type: 'workshop' }).sort({ updated_at: -1 }).exec(async (err, categories) => {
      if (err) return res.status(400).json({ message: 'Error while getting all categories.', err });
      const workshops = await categories.reduce(async (previousPromise, category) => {
        const obj = await previousPromise;
        try {
          return {
            ...obj,
            [category._id]: await Workshop.find({ category: category._id })
              .limit(3)
              .populate('category', ['name', '_id'])
              .sort({ created_at: -1 }),
          };
        } catch (error) {
          return res.status(400).json({ message: 'Error while getting initial workshops.', err: error });
        }
      }, Promise.resolve({}));
      return res.json({ workshops, categories, message: 'Successfully retrieved 3 workshops from each category.' });
    });
  }
  // If has query, return as requested (default all)
  const { start, count, ...searchTerm } = req.query;
  return Workshop.find(searchTerm)
    .skip(start * 1 || 0)
    .limit(count * 1 || 0)
    .populate('category', ['name', '_id'])
    .sort({ created_at: -1 })
    .exec((err, workshops) => {
      if (err) return res.status(400).json({ message: 'Error while getting filtered workshops.', err });
      return res.json({ workshops, searchTerm });
    });
};

const getWorkshop = (req, res) => {
  const { workshopid } = req.params;
  if (!workshopid) return res.status(400).json({ message: 'No ID provided while getting workshop.' });
  return Workshop.findById(workshopid).populate('category', ['name', '_id']).exec((err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while getting workshop.', err });
    if (!doc) return res.status(404).json({ message: 'No workshop found with this ID.' });
    return res.json({ workshop: doc });
  });
};

module.exports = {
  getAllWorkshops,
  getWorkshop,
};
