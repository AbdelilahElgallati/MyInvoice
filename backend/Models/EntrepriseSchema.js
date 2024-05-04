const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnterpriseSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'standart'},
    subscription: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
    phone: { type: String, required: true },
    address: { type: String, required: true  },
    logo: { type: String }
  },
  {timestamps: true}
);

const Enterprise = mongoose.model('Enterprise', EnterpriseSchema);

module.exports = Enterprise;