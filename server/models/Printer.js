const mongoose = require('mongoose');

const PrinterSchema = mongoose.Schema({
  type: String, // FDM, DSP, DLP
  consumables: String, // 树脂
  class: String, // 工业级
  availabilty: Boolean, // Current status (under repair)
  availablePeriod: [{
    from: String,
    to: String,
  }],
  remark: String,
  fee: Number,
});

const Printer = mongoose.model('Printer', PrinterSchema);

module.exports = Printer;
