const Kickstarter = require('../models/Kickstarter');

exports.getKickstarters = async (req, res) => {
  try {
    const { count = 15, startId } = req.query;
    const searchTerm = {};
    if (!(req.user && req.user.role === 'admin')) searchTerm.approved = true;
    if (startId) searchTerm._id = { $lt: startId };
    const kickstarters = await Kickstarter.find(searchTerm)
      .limit(count * 1)
      .sort({ created_at: -1 });
    res.json({ kickstarters });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.createKickstarter = async (req, res) => {
  try {
    const {
      title,
      description,
      contact: { email } = {},
      targetAmount,
    } = req.body;
    if (!title || !description || !email || !targetAmount) throw new Error('Incomplete info.');
    const newKickstarter = await Kickstarter.create({
      ...req.body,
      user: req.user._id,
    });
    res.json({ kickstarter: newKickstarter });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateKickstarter = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Object.keys(req.body).length) throw new Error('Missing update payload.');
    const updatedKickstarter = await Kickstarter.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ kickstarter: updatedKickstarter });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteKickstarter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedKickstarter = await Kickstarter.findByIdAndDelete(id);
    res.json({ kickstarter: deletedKickstarter });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Admin
 */

exports.approveKickstarter = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    if (approved === undefined || approved === null) throw new Error('Not supplying approvement');
    await Kickstarter.findByIdAndUpdate(id, { approved }, { new: true });
    res.json({ message: `Successfully marked as ${approved ? 'approved' : 'unapproved'}` });
  } catch (error) {
    console.log('error: ', error);
    res.status(400).json({ message: error.message });
  }
};
