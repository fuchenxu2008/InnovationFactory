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

module.exports = {
  addEvent,
  deleteEvent,
};
