const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  active: { type: Number, enum: [0,1], default: 1 },
});

const Model = mongoose.model('Model', ModelSchema);
module.exports = Model;
