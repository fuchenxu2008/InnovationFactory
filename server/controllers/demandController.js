const Demand = require('../models/Demand');

exports.getDemands = async (req, res) => {
  try {
    const { count = 15, startId } = req.query;
    const searchTerm = {};
    // if (!(req.user && req.user.role === 'admin')) searchTerm.approved = true;
    if (startId) searchTerm._id = { $lt: startId };
    const demands = await Demand
      .find(searchTerm)
      .limit(count * 1)
      .sort({ created_at: -1 });
    res.json({ demands });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.getDemand = async (req, res) => {
  try {
    const { id } = req.params;
    const demand = await Demand.findById(id).populate('user', 'userInfo _id');
    res.json({ demand });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.createDemand = async (req, res) => {
  try {
    const {
      title,
      description,
      contact: { email } = {},
    } = req.body;
    if (!title || !description || !email) throw new Error('Incomplete info.');
    const newDemand = await Demand.create({
      ...req.body,
      user: req.user._id,
    });
    res.json({ demand: newDemand });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateDemand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Object.keys(req.body).length) throw new Error('Missing update payload.');
    const updatedDemand = await Demand.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ demand: updatedDemand });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDemand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDemand = await Demand.findByIdAndDelete(id);
    res.json({ demand: deletedDemand });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Admin
 */

exports.approveDemand = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    if (approved === undefined || approved === null) throw new Error('Not supplying approvement');
    await Demand.findByIdAndUpdate(id, { approved }, { new: true });
    res.json({ message: `Successfully marked as ${approved ? 'approved' : 'unapproved'}` });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};
