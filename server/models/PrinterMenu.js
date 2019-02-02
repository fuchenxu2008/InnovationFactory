const mongoose = require('mongoose');

const PrinterMenuSchema = mongoose.Schema({
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

const PrinterMenu = mongoose.model('PrinterMenu', PrinterMenuSchema);

module.exports = PrinterMenu;
