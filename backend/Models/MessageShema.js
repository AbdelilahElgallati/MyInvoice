const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["accepter", "Désactiver"], default: "Désactiver" },
  active: { type: Boolean, default: true },},
  {timestamps: true}
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;