const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BonCommandeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Enterprise", required: true },
    fournisseurId: {
      type: Schema.Types.ObjectId,
      ref: "Fournisseur",
      required: true,
    },
    date: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number },
      },
    ],
    status: { type: String, enum: ["attentTraitement", "auCourTraitement", "expédié"], default: "attentTraitement" },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const BonCommande = mongoose.model("BonCommande", BonCommandeSchema);

module.exports = BonCommande;
