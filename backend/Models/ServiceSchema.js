const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  ServiceName: { type: String, required: true },
  active: { type: Number, enum: [0,1], default: 1 },
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;