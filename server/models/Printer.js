const mongoose = require('mongoose');

const PrinterSchema = mongoose.Schema({
  albumPicPath: String,
  type: String, // FDM, DSP, DLP
  consumables: String, // 树脂
  consumableCost: String,
  class: String, // 工业级
  quantity: Number,
  productSize: String,
  productCharacter: String,
  postProcessing: String,
  application: String,
  fee: Number,
  remark: String,
});

const Printer = mongoose.model('Printer', PrinterSchema);

module.exports = Printer;
