const mongoose = require('mongoose');
// const Event = require('./models/Event');
// const Workshop = require('./models/Workshop');
const Activity = require('./models/Activity');

const EventOrder = require('./models/EventOrder');
const WorkshopOrder = require('./models/WorkshopOrder');
const ActivityOrder = require('./models/ActivityOrder');

const { mongoURL } = require('./config');

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
}, () => {
  console.log(`[√] 🗄  Database is connected at ${mongoURL}`);
});

// Event.find({})
//   .then(events => Activity.insertMany(events.map(event => ({
//     ...event.toObject(),
//     type: 'event',
//   })))).then(res => console.log(res))
//   .catch(err => console.log(err));

// Workshop.find({})
//   .then(workshops => Activity.insertMany(workshops.map(workshop => ({
//     ...workshop.toObject(),
//     type: 'workshop',
//   })))).then(res => console.log(res))
//   .catch(err => console.log(err));

EventOrder.find({})
  .then(eventOrders => ActivityOrder.insertMany(eventOrders.map(eventOrder => ({
    ...eventOrder.toObject(),
    type: 'event',
    activity: eventOrder.event,
  })))).then(res => console.log(res))
  .catch(err => console.log(err));

WorkshopOrder.find({})
  .then(workshopOrders => ActivityOrder.insertMany(workshopOrders.map(workshopOrder => ({
    ...workshopOrder.toObject(),
    type: 'workshop',
    activity: workshopOrder.workshop,
  })))).then(res => console.log(res))
  .catch(err => console.log(err));
