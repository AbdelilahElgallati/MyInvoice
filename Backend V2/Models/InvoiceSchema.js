const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: true },
  clientId: { type: String, ref: 'Client', required: true },
  clientName: { type: String, required: true},
  invoiceNumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
  }],
  status: { type: String, enum: ['sent', 'paid', 'late'], default: 'sent' },
  payments: [{
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now }
  }]
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;