const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;