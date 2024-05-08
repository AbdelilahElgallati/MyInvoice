const Invoice = require("../Models/InvoiceSchema");
const OverallStat = require ("../Models/OverallStateSchema");
const Client = require  ("../Models/ClientSchema");
const Product = require  ("../Models/ProductSchema");

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
// const getAllInvoices = async (req, res) => {
//   try {
//     const { page = 1, pageSize = 20, sort = null, search = "", id } = req.query;
//     const generateSort = () => {
//       const sortParsed = JSON.parse(sort);
//       const sortFormatted = {
//         [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
//       };

//       return sortFormatted;
//     };
//     const sortFormatted = Boolean(sort) ? generateSort() : {};

//     const invoices = await Invoice.find({
//       userId : id,
//     })
//       .sort(sortFormatted)
//       .skip(page * pageSize)
//       .limit(pageSize);

//     const total = await Invoice.countDocuments({
//       name: { $regex: search, $options: "i" },
//     });
//     const totalItems = await Invoice.countDocuments();

//     res.status(200).json({
//       invoices,
//       total,
//       totalItems,
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

const getAllInvoices = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "", id } = req.query;
    
    // Fonction pour générer l'objet de tri
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };

    // Obtenir l'objet de tri
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Filtrer les factures par l'ID de l'utilisateur
    const invoices = await Invoice.find({ userId: id })
      .sort(sortFormatted)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

      console.log("return invoices :", invoices);
    // Total des factures correspondant à la recherche
    const total = await Invoice.countDocuments({
      userId: id,
      invoiceNumber: { $regex: search, $options: "i" },
    });

    // Nombre total de factures pour cet utilisateur
    const totalItems = await Invoice.countDocuments({ userId: id });
    console.log('invoice : ',invoices )
    // Répondre avec les résultats
    res.status(200).json({
      invoices,
      total,
      totalItems,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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
    const currentMonth = "Mai";
    const currentYear = 2021;
    const currentDay = "2021-05-05";

    const invoices = await Invoice.find().limit(50).sort({ createdOn: -1 });

    const totalCustomers = await Client.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalInvoices = await Invoice.countDocuments();
    const totalAmount = await Invoice.aggregate([
      {
        $unwind: "$payments", 
      },
      {
        $group: {
          _id: "$status", 
          totalAmount: { $sum: "$payments.amount" }, 
        },
      },
    ]);
    const totalPaidInvoices = await Invoice.countDocuments({ status: "paid" });
    const totalUnpaidInvoices = await Invoice.countDocuments({
      status: { $nin: ["paid"] },
    });
    const overallStat = await OverallStat.find({ year: currentYear });

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

    res.status(200).json({
      invoices,
      totalCustomers,
      totalProducts,
      totalInvoices,
      totalAmount,
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
};
