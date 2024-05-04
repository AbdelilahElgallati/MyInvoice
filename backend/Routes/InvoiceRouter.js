const express = require("express");
const InvoiceRouter = express.Router();
const InvoiceController = require("../Controllers/InvoiceController");

InvoiceRouter.get( "/", InvoiceController.getAllInvoices); 
InvoiceRouter.get( "/:id", InvoiceController.getOneInvoice); 
InvoiceRouter.post('/add',InvoiceController.addInvoice);
InvoiceRouter.put('/edit/:id',InvoiceController.updateInvoice);
InvoiceRouter.delete("/remove/:id",InvoiceController.removeInvoice);

module.exports = InvoiceRouter;