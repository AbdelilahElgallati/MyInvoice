const Invoice = require("../Models/InvoiceSchema");
const OverallStat = require ("../Models/OverallStateSchema");
const Client = require  ("../Models/ClientSchema");
const Product = require  ("../Models/ProductSchema");
const Enterprise = require("../Models/EntrepriseSchema");

const addInvoice = async (req, res) => {
  try {
    const InvoiceData = req.body.invoice;
    const invoice = new Invoice(InvoiceData);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout de facture");
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const Allinvoices = await Invoice.find().populate("clientId").limit(50).sort({ createdOn: -1 });
    const invoices = Allinvoices.filter(invoice => invoice.userId.toString() === req.params.id);
    res.status(200).json(invoices);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const prepareInvoiceDetails = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('userId', 'name email phone address logo') 
      .populate('clientId', 'name email phone address') 
      .populate({
        path: 'items.productId',
        select: 'name price', 
      });
   
    const formattedDate = formatDate(invoice.date);
    const formattedDueDate = formatDate(invoice.dueDate);
    const itemsTable = invoice.items.map((item) => {
      return {
        productName: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });
      invoiceNumber= invoice.invoiceNumber;
      invoiceStatus = invoice.status;
      userName = invoice.userId.name;
      userEmail = invoice.userId.email;
      userPhone = invoice.userId.phone;
      userAddress = invoice.userId.address;
      userLogo = invoice.userId.logo;
      clientName = invoice.clientId.name;
      clientEmail = invoice.clientId.email;
      clientPhone = invoice.clientId.phone;
      clientAddress = invoice.clientId.address;
      amount = invoice.amount;
      
      res.status(200).json({
        invoiceNumber,
        invoiceStatus,
        userName,
        userEmail,
        userPhone,
        userAddress,
        userLogo,
        clientName,
        clientEmail,
        clientPhone,
        clientAddress,
        formattedDate,
        formattedDueDate,
        itemsTable,
        amount,
      });
  } catch (error) {
    console.error('Error fetching invoice details:', error.message);
    throw error;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return '';
  }
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("fr-FR", options);
};


const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    console.log('start')
    const currentMonth = "Mai";
    const currentYear = 2024;
    const currentDay = "2024-05-05";
    console.log('req : ', req.params)
    const Allinvoices = await Invoice.find().populate("clientId").limit(50).sort({ createdOn: -1 });
    console.log('Allinvoices : ',Allinvoices )
    const invoices = Allinvoices.filter(invoice => invoice.userId.toString() === req.params.id);
    console.log('invoices : ',invoices )
    const totalCustomers = await Client.countDocuments({ userId: req.params.id });
    console.log('totalCustomers : ',totalCustomers )
    const totalProducts = await Product.countDocuments({ userId: req.params.id });
    console.log('totalProducts : ',totalProducts )
    const totalInvoices = await Invoice.countDocuments({ userId: req.params.id });
    console.log('totalInvoices : ',totalInvoices )
    const totalPaidInvoices = await Invoice.countDocuments({ userId: req.params.id, status: "paid" });
    console.log('totalPaidInvoices : ',totalPaidInvoices )
    const totalUnpaidInvoices = await Invoice.countDocuments({
      userId: req.params.id, status: { $nin: ["paid"] },
    });
    console.log('totalUnpaidInvoices : ',totalUnpaidInvoices )
    const overallStat = await OverallStat.find({ year: currentYear });
    console.log('overallStat : ',overallStat )
    const paidInvoices = await Invoice.find({ userId: req.params.id, status: "paid" });
    console.log('paidInvoices : ',paidInvoices )
    const totalPaidAmount = paidInvoices.reduce((total, invoice) => total + invoice.amount, 0);
    console.log('totalPaidAmount : ',totalPaidAmount )
    const {
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    console.log(  invoices,
      totalPaidAmount,
      totalCustomers,
      totalProducts,
      totalInvoices,
      totalPaidInvoices,
      totalUnpaidInvoices,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,);
    res.status(200).json({
      invoices,
      totalPaidAmount,
      totalCustomers,
      totalProducts,
      totalInvoices,
      totalPaidInvoices,
      totalUnpaidInvoices,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getOneInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de facture");
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de facture");
  }
};

const removeInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de facture");
  }
};

module.exports = {
  addInvoice,
  getAllInvoices,
  getOneInvoice,
  updateInvoice,
  removeInvoice,
  getSales,
  getDashboardStats,
  prepareInvoiceDetails,
};