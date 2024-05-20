const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["accepter", "Désactiver"], default: "Désactiver" },
  active: { type: Number, enum: [0,1], default: 1 },
},
  {timestamps: true}
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;