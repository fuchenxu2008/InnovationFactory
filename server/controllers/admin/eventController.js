const fs = require('fs');
const path = require('path');
const Event = require('../../models/Event');
const Category = require('../../models/Category');

const addEvent = (req, res) => {
  let event;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    event = JSON.parse(req.body.event);
  } catch (err) {
    return res.status(400).json({ message: 'Error while creating event.', err });
  }
  const { filename } = req.file || {};
  if (!event || !filename) return res.status(400).json({ message: 'Missing info while creating event.' });
  // Info complete
  return Event.create({
    ...event,
    albumPicPath: `/api/image/${filename}`,
  }, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating event.', err });
    return Event.findById(doc._id).populate('category', ['name', '_id']).exec((err2, newEvent) => {
      if (err2) return res.status(400).json({ message: 'Error while populating event.', err: err2 });
      res.json({ message: 'Successfully created event!', event: newEvent });
      return Category.findById(event.category, (err3, category) => {
        category.set({ updated_at: newEvent.created_at });
        category.save();
      });
    });
  });
};

const deleteEvent = (req, res) => {
  Event.findByIdAndDelete(req.params.eventid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while deleting event.', err });
    if (!doc) return res.status(404).json({ message: 'Could not find event with specified _id' });
    res.json({ message: 'Successfully deleted event!', event: doc });
    // Remove picture attached to the event
    const pathArr = doc.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    return fs.unlink(path.join(global.__root, `storage/event/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
  });
};

const updateEventWithImage = (req, res) => {
  let editedEvent;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    editedEvent = JSON.parse(req.body.event);
  } catch (err) {
    return res.status(400).json({ message: 'Error while parsing event.', err });
  }
  const { filename } = req.file || {};
  const { eventid } = req.params;
  if (!editedEvent || !filename || !eventid) return res.status(400).json({ message: 'Missing info while updating event.' });
  return Event.findById(eventid, (err, event) => {
    if (err) return res.status(400).json({ message: 'Error while finding event before updating.', err });
    // Remove old picture attached to the event
    const pathArr = event.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    fs.unlink(path.join(global.__root, `storage/event/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
    // Update event
    event.set({
      ...editedEvent,
      albumPicPath: `/api/image/${filename}`,
    });
    return event.save((err2, doc) => {
      if (err2) return res.status(400).json({ message: 'Error while finding event before updating.', err: err2 });
      return Event.findById(doc._id).populate('category', ['name', '_id']).exec((err3, updatedEvent) => {
        if (err3) return res.status(400).json({ message: 'Error while populating event.', err: err3 });
        return res.json({ message: 'Successfully updated event!', event: updatedEvent });
      });
    });
  });
};

const updateEventWithoutImage = (req, res) => {
  const editedEvent = req.body.event;
  if (!req.params.eventid || !editedEvent) return res.status(400).json({ message: 'Incomplete info while updating event.' });
  // restore image's full http url to api path
  const pathArr = editedEvent.albumPicPath.split('/');
  const filename = pathArr[pathArr.length - 1];
  return Event.findById(req.params.eventid, (err, event) => {
    if (err) return res.status(400).json({ message: 'Error while finding event before updating.', err });
    event.set({
      ...editedEvent,
      albumPicPath: `/api/image/${filename}`,
    });
    return event.save((err2, doc) => {
      if (err2) return res.status(400).json({ message: 'Error while updating event.', err: err2 });
      if (!doc) return res.status(404).json({ message: 'Could not find event with specified _id' });
      return Event.findById(doc._id).populate('category', ['name', '_id']).exec((err3, updatedEvent) => {
        if (err3) return res.status(400).json({ message: 'Error while populating event.', err: err3 });
        return res.json({ message: 'Successfully updated event!', event: updatedEvent });
      });
    });
  });
};

module.exports = {
  addEvent,
  deleteEvent,
  updateEventWithImage,
  updateEventWithoutImage,
};
