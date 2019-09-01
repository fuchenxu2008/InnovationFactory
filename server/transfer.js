const mongoose = require('mongoose');
const Activity = require('./models/Activity');
const Category = require('./models/Category');
const Printer = require('./models/Printer');
const { event, workshop, printer } = require('./db.json');
const { username, password, host, port, database } = require('./config/db.json');

const mongoUrl = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

const transferModel = async (Model, data) => {
  try {
    await Model.insertMany(data);
    console.log('Transfered');
  } catch (error) {
    console.log('error: ', error);
  }
};

mongoose.connection.on('connected', async () => {
  console.log('connected');
  try {
    const { allEvents, eventCategories } = event;
    const { allWorkshops, workshopCategories } = workshop;
    const { allPrinters } = printer;
    await Promise.all([
      transferModel(Activity, allEvents),
      transferModel(Activity, allWorkshops),
      transferModel(Category, [...eventCategories, ...workshopCategories]),
      transferModel(Printer, allPrinters),
    ]);
    console.log('Done!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  } catch (error) {
    console.log('Final error: ', error);
  }
});
