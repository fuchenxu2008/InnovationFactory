const fs = require('fs');
const path = require('path');
const Workshop = require('../../models/Workshop');

const addWorkshop = (req, res) => {
  let workshop;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    workshop = JSON.parse(req.body.workshop);
  } catch (err) {
    return res.status(400).json({ message: 'Error while creating workshop.', err });
  }
  const { filename } = req.file || {};
  if (!workshop || !filename) return res.status(400).json({ message: 'Missing info while creating workshop.' });
  // Info complete
  return Workshop.create({
    ...workshop,
    albumPicPath: `/api/image/${filename}`,
  }, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating workshop.', err });
    return res.json({ message: 'Successfully created workshop!', workshop: doc });
  });
};

const deleteWorkshop = (req, res) => {
  Workshop.findByIdAndDelete(req.params.workshopid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while deleting workshop.', err });
    if (!doc) return res.status(404).json({ message: 'Could not find workshop with specified _id' });
    res.json({ message: 'Successfully deleted workshop!', workshop: doc });
    // Remove picture attached to the workshop
    const pathArr = doc.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    return fs.unlink(path.join(global.__root, `storage/workshop/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
  });
};

const updateWorkshopWithImage = (req, res) => {
  let editedWorkshop;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    editedWorkshop = JSON.parse(req.body.workshop);
  } catch (err) {
    return res.status(400).json({ message: 'Error while parsing workshop.', err });
  }
  const { filename } = req.file || {};
  const { workshopid } = req.params;
  if (!editedWorkshop || !filename || !workshopid) return res.status(400).json({ message: 'Missing info while updating workshop.' });
  return Workshop.findById(workshopid, (err, workshop) => {
    if (err) return res.status(400).json({ message: 'Error while finding workshop before updating.', err });
    // Remove old picture attached to the workshop
    const pathArr = workshop.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    fs.unlink(path.join(global.__root, `storage/workshop/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
    // Update workshop
    workshop.set({
      ...editedWorkshop,
      albumPicPath: `/api/image/${filename}`,
    });
    return workshop.save((err2, updatedWorkshop) => {
      if (err2) return res.status(400).json({ message: 'Error while finding workshop before updating.', err: err2 });
      return res.json({ message: 'Successfully updated workshop!', workshop: updatedWorkshop });
    });
  });
};

const updateWorkshopWithoutImage = (req, res) => {
  const editedWorkshop = req.body.workshop;
  if (!req.params.workshopid || !editedWorkshop) return res.status(400).json({ message: 'Incomplete info while updating workshop.' });
  // restore image's full http url to api path
  const pathArr = editedWorkshop.albumPicPath.split('/');
  const filename = pathArr[pathArr.length - 1];
  return Workshop.findById(req.params.workshopid, (err, workshop) => {
    if (err) return res.status(400).json({ message: 'Error while finding workshop before updating.', err });
    workshop.set({
      ...editedWorkshop,
      albumPicPath: `/api/image/${filename}`,
    });
    return workshop.save((err2, updatedWorkshop) => {
      if (err2) return res.status(400).json({ message: 'Error while updating workshop.', err: err2 });
      if (!updatedWorkshop) return res.status(404).json({ message: 'Could not find workshop with specified _id' });
      return res.json({ message: 'Successfully updated workshop!', workshop: updatedWorkshop });
    });
  });
};

module.exports = {
  addWorkshop,
  deleteWorkshop,
  updateWorkshopWithImage,
  updateWorkshopWithoutImage,
};
