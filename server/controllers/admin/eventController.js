const fs = require('fs');
const path = require('path');
const Event = require('../../models/Event');

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
    return res.json({ message: 'Successfully created event!', event: doc });
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
    return fs.unlink(path.join(global.__root, `storage/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
  });
};

const updateEventWithImage = (req, res) => {
  let updatedEvent;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    updatedEvent = JSON.parse(req.body.event);
  } catch (err) {
    return res.status(400).json({ message: 'Error while updating event.', err });
  }
  const { filename } = req.file || {};
  const { eventid } = req.params;
  if (!updatedEvent || !filename || !eventid) return res.status(400).json({ message: 'Missing info while updating event.' });
  // Assemble updated event object
  updatedEvent = {
    ...updatedEvent,
    albumPicPath: `/api/image/${filename}`,
    _id: eventid,
  };
  // Get old document, so no { new: true }
  return Event.findByIdAndUpdate(eventid, updatedEvent, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while updating event.', err });
    res.json({ message: 'Successfully updated event!', event: updatedEvent });
    // Remove old picture attached to the event
    const pathArr = doc.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    return fs.unlink(path.join(global.__root, `storage/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
  });
};

const updateEventWithoutImage = (req, res) => {
  const { event } = req.body;
  if (!req.params.eventid || !event) return res.status(400).json({ message: 'Incomplete info while updating event.' });
  const pathArr = event.albumPicPath.split('/');
  const filename = pathArr[pathArr.length - 1];
  return Event.findByIdAndUpdate(req.params.eventid, {
    ...event,
    albumPicPath: `/api/image/${filename}`,
  }, { new: true },
  (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while updating event.', err });
    if (!doc) return res.status(404).json({ message: 'Could not find event with specified _id' });
    return res.json({ message: 'Successfully updated event!', event: doc });
  });
};

module.exports = {
  addEvent,
  deleteEvent,
  updateEventWithImage,
  updateEventWithoutImage,
};
