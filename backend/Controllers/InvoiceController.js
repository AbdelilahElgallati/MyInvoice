const Invoice = require("../Models/InvoiceSchema")

const addInvoice = async (req, res) => {
  try {
    const InvoiceData = req.query;
    const invoice = new Invoice(InvoiceData);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout de facture");
  }
}

const  getAllInvoices = async (req, res) => {
  try {
    const  invoices = await Invoice.find();
    res.status(201).json(invoices);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des factures");
  }
}

const  getOneInvoice = async (req, res) => {
  try {
    const  invoice = await Invoice.findById(req.params.id);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de facture");
  }
}

const  updateInvoice = async (req,res)=>{
  try {
    const  invoice = await Invoice.findByIdAndUpdate(req.params.id, req.query, {new: true});
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de facture");
  }
}

const  removeInvoice = async (req, res) => {
  try {
    const  invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de facture");
  }
}

module.exports = {addInvoice,getAllInvoices,getOneInvoice,updateInvoice,removeInvoice};