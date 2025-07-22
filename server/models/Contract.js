const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  number: String,
  department: String,
  company: String,
  validUntil: String,
  person: String,
  filePath: String,
  fileName: String,
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
