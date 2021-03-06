const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const readJSON = require('../utils/readJSON');
const Printer = require('../models/Printer');
const PrinterOrder = require('../models/PrinterOrder');
const { generateTimeSlots } = require('../utils/printerDetect');
const { updateTimeslots } = require('../utils/cronJobs/updateTimeslots');

const getAllPrinters = (req, res) => {
  const searchTerm = req.query;
  PrinterOrder.find({
    timeSlot: { $gte: moment().add(1, 'days').format('YYYY-MM-DD') },
  }).select('printer timeSlot').then((printerOrders) => {
    Printer.find(searchTerm).lean()
      .then(async (allPrinters) => {
        const printers = await Promise.all(allPrinters.map(async printer => ({
          ...printer,
          timeSlot: await generateTimeSlots(
            printer,
            printerOrders.filter(order => order.printer.equals(printer._id)),
          ),
        })));
        res.json({ printers, searchTerm });
      });
  })
    .catch(err => res.status(400).json({ message: 'Error while getting all printers.', err }));
};

const getPrinter = (req, res) => {
  const { printerid } = req.params;
  if (!printerid) return res.status(400).json({ message: 'No ID provided while getting printer.' });
  return Printer.findById(printerid, (err, printer) => {
    if (err) return res.status(400).json({ message: 'Error while getting printer.', err });
    if (!printer) return res.status(404).json({ message: 'No printer found with this ID.' });
    return res.json({ printer });
  });
};

/**
 * Admin Functions
 */

const addPrinter = (req, res) => {
  let printer;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    printer = JSON.parse(req.body.printer);
  } catch (err) {
    return res.status(400).json({ message: 'Error while creating printer.', err });
  }
  const { filename } = req.file || {};
  if (!printer || !filename) return res.status(400).json({ message: 'Missing info while creating printer.' });
  // Info complete
  return Printer.create({
    ...printer,
    albumPicPath: `/api/image/${filename}`,
  }, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while creating printer.', err });
    return res.json({ message: 'Successfully created printer!', printer: doc });
  });
};

const deletePrinter = (req, res) => {
  Printer.findByIdAndDelete(req.params.printerid, (err, doc) => {
    if (err) return res.status(400).json({ message: 'Error while deleting printer.', err });
    if (!doc) return res.status(404).json({ message: 'Could not find printer with specified _id' });
    res.json({ message: 'Successfully deleted printer!', printer: doc });
    // Remove picture attached to the printer
    const pathArr = doc.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    return fs.unlink(path.join(global.__root, `storage/printer/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
  });
};

const updatePrinterWithImage = (req, res) => {
  let editedPrinter;
  try {
    // wx.upload sends form bug -> '[Object, Object]' => so request is stringified
    editedPrinter = JSON.parse(req.body.printer);
  } catch (err) {
    return res.status(400).json({ message: 'Error while parsing printer.', err });
  }
  const { filename } = req.file || {};
  const { printerid } = req.params;
  if (!editedPrinter || !filename || !printerid) return res.status(400).json({ message: 'Missing info while updating printer.' });
  return Printer.findById(printerid, (err, printer) => {
    if (err) return res.status(400).json({ message: 'Error while finding printer before updating.', err });
    // Remove old picture attached to the printer
    const pathArr = printer.albumPicPath.split('/');
    const picFile = pathArr[pathArr.length - 1];
    fs.unlink(path.join(global.__root, `storage/printer/${picFile}`), (error) => {
      if (error) console.log('Error while deleting file:', error);
    });
    // Update printer
    printer.set({
      ...editedPrinter,
      albumPicPath: `/api/image/${filename}`,
    });
    return printer.save((err2, doc) => {
      if (err2) return res.status(400).json({ message: 'Error while finding printer before updating.', err: err2 });
      return res.json({ message: 'Successfully updated printer!', printer: doc });
    });
  });
};

const updatePrinterWithoutImage = (req, res) => {
  const editedPrinter = req.body.printer;
  if (!req.params.printerid || !editedPrinter) return res.status(400).json({ message: 'Incomplete info while updating printer.' });
  // restore image's full http url to api path
  const pathArr = editedPrinter.albumPicPath.split('/');
  const filename = pathArr[pathArr.length - 1];
  return Printer.findById(req.params.printerid, (err, printer) => {
    if (err) return res.status(400).json({ message: 'Error while finding printer before updating.', err });
    printer.set({
      ...editedPrinter,
      albumPicPath: `/api/image/${filename}`,
    });
    return printer.save((err2, doc) => {
      if (err2) return res.status(400).json({ message: 'Error while updating printer.', err: err2 });
      if (!doc) return res.status(404).json({ message: 'Could not find printer with specified _id' });
      return res.json({ message: 'Successfully updated printer!', printer: doc });
    });
  });
};

const getDistinctPrinters = (req, res) => {
  Printer.find()
    .select('type class')
    .then((printers) => {
      res.json({
        event: req.events,
        workshop: req.workshops,
        printer: printers.map(printer => ({
          title: `${printer.type} ${printer.class}`,
          _id: printer._id,
        })),
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Error while getting distinct printers',
        err,
      });
    });
};

const getTimeSlots = async (req, res) => {
  const timeslots = await readJSON('config/timeslots.json');
  res.json(timeslots);
};

const publishTimeSlots = async (req, res) => {
  const { timeSlots } = req.body;
  fs.writeFile(path.join(global.__root, 'config/timeslots.json'), JSON.stringify(timeSlots), (err) => {
    if (err) return res.status(400).json({ message: 'Error while editing timeslots.', err });
    updateTimeslots();
    return res.json({ message: 'Successfully edited timeslots!', timeSlots });
  });
};

module.exports = {
  getAllPrinters,
  getPrinter,
  // admin
  addPrinter,
  deletePrinter,
  updatePrinterWithImage,
  updatePrinterWithoutImage,
  getDistinctPrinters,
  getTimeSlots,
  publishTimeSlots,
};
