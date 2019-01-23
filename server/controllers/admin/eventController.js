const Event = require('../../models/Event');

const addEvent = (req, res) => {
  let event;
  try {
    event = JSON.parse(req.body.event);
  } catch (err) {
    return res.status(400).json({ message: 'Error while creating event.', err });
  }
  const { filename } = req.file || {};
  if (!event || !filename) return res.status(400).json({ message: 'Missing info while creating event.' });
  console.log(event);
  // Info complete
  return Event.create({
    ...event,
    albumPicPath: `/api/image/${filename}`,
  }, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating event.', err });
    return res.json({ message: 'Successfully created event!', event: doc });
  });
};

module.exports = {
  addEvent,
};
