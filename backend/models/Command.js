const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  command: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Command', commandSchema);
