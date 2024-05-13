const BonCommande = require("../Models/BonCommandesModel");
const OverallStat = require ("../Models/OverallStateSchema");
const Fournisseur = require  ("../Models/FournisseurSchema");
const Product = require  ("../Models/ProductSchema");
const Enterprise = require("../Models/EntrepriseSchema");

const addBonCommande = async (req, res) => {
  try {
    
    const bonCommandeData = req.body.bonCommande;
    const bonCommande = new BonCommande(bonCommandeData);
    await bonCommande.save();
    res.status(201).json(bonCommande);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout de facture");
  }
};

const getAllBonCommandes = async (req, res) => {
  try {
    const AllbonCommandes = await BonCommande.find().populate("fournisseurId").limit(50).sort({ createdOn: -1 });
    const bonCommandes = AllbonCommandes.filter(bonCommande => bonCommande.userId.toString() === req.params.id);
    res.status(200).json(bonCommandes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const prepareBonCommandeDetails = async (req, res) => {
  try {
    const bonCommande = await BonCommande.findById(req.params.id)
      .populate('userId', 'name email phone address logo') 
      .populate('fournisseurId', 'name email phone address') 
      .populate({
        path: 'items.productId',
        select: 'name price', 
      });
   
    const formattedDate = formatDate(bonCommande.date);
    const formattedDueDate = formatDate(bonCommande.dueDate);
    const itemsTable = bonCommande.items.map((item) => {
      return {
        productName: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });
      bonCommandeNumber= bonCommande.bonCommandeNumber;
      bonCommandeStatus = bonCommande.status;
      userName = bonCommande.userId.name;
      userEmail = bonCommande.userId.email;
      userPhone = bonCommande.userId.phone;
      userAddress = bonCommande.userId.address;
      userLogo = bonCommande.userId.logo;
      fournisseurName = bonCommande.fournisseurId.name;
      fournisseurEmail = bonCommande.fournisseurId.email;
      fournisseurPhone = bonCommande.fournisseurId.phone;
      fournisseurAddress = bonCommande.fournisseurId.address;
      amount = bonCommande.amount;
      
      res.status(200).json({
        bonCommandeNumber,
        bonCommandeStatus,
        userName,
        userEmail,
        userPhone,
        userAddress,
        userLogo,
        fournisseurName,
        fournisseurEmail,
        fournisseurPhone,
        fournisseurAddress,
        formattedDate,
        formattedDueDate,
        itemsTable,
        amount,
      });
  } catch (error) {
    console.error('Error fetching bonCommande details:', error.message);
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


// const getSales = async (req, res) => {
//   try {
//     const overallStats = await OverallStat.find();

//     res.status(200).json(overallStats[0]);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// const getDashboardStats = async (req, res) => {
//   try {
//     console.log('start')
//     const currentMonth = "Mai";
//     const currentYear = 2024;
//     const currentDay = "2024-05-05";
//     console.log('req : ', req.params)
//     const AllbonCommandes = await bonCommande.find().populate("clientId").limit(50).sort({ createdOn: -1 });
//     console.log('AllbonCommandes : ',AllbonCommandes )
//     const bonCommandes = AllbonCommandes.filter(bonCommande => bonCommande.userId.toString() === req.params.id);
//     console.log('bonCommandes : ',bonCommandes )
//     const totalCustomers = await Client.countDocuments({ userId: req.params.id });
//     console.log('totalCustomers : ',totalCustomers )
//     const totalProducts = await Product.countDocuments({ userId: req.params.id });
//     console.log('totalProducts : ',totalProducts )
//     const totalbonCommandes = await bonCommande.countDocuments({ userId: req.params.id });
//     console.log('totalbonCommandes : ',totalbonCommandes )
//     const totalPaidbonCommandes = await bonCommande.countDocuments({ userId: req.params.id, status: "paid" });
//     console.log('totalPaidbonCommandes : ',totalPaidbonCommandes )
//     const totalUnpaidbonCommandes = await bonCommande.countDocuments({
//       userId: req.params.id, status: { $nin: ["paid"] },
//     });
//     console.log('totalUnpaidbonCommandes : ',totalUnpaidbonCommandes )
//     const overallStat = await OverallStat.find({ year: currentYear });
//     console.log('overallStat : ',overallStat )
//     const paidbonCommandes = await bonCommande.find({ userId: req.params.id, status: "paid" });
//     console.log('paidbonCommandes : ',paidbonCommandes )
//     const totalPaidAmount = paidbonCommandes.reduce((total, bonCommande) => total + bonCommande.amount, 0);
//     console.log('totalPaidAmount : ',totalPaidAmount )
//     const {
//       yearlyTotalSoldUnits,
//       yearlySalesTotal,
//       monthlyData,
//       salesByCategory,
//     } = overallStat[0];

//     const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
//       return month === currentMonth;
//     });

//     const todayStats = overallStat[0].dailyData.find(({ date }) => {
//       return date === currentDay;
//     });
//     console.log(  bonCommandes,
//       totalPaidAmount,
//       totalCustomers,
//       totalProducts,
//       totalbonCommandes,
//       totalPaidbonCommandes,
//       totalUnpaidbonCommandes,
//       yearlyTotalSoldUnits,
//       yearlySalesTotal,
//       monthlyData,
//       salesByCategory,
//       thisMonthStats,
//       todayStats,);
//     res.status(200).json({
//       bonCommandes,
//       totalPaidAmount,
//       totalCustomers,
//       totalProducts,
//       totalbonCommandes,
//       totalPaidbonCommandes,
//       totalUnpaidbonCommandes,
//       yearlyTotalSoldUnits,
//       yearlySalesTotal,
//       monthlyData,
//       salesByCategory,
//       thisMonthStats,
//       todayStats,
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

const getOneBonCommande = async (req, res) => {
  try {
    const bonCommande = await BonCommande.findById(req.params.id);
    res.status(201).json(bonCommande);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de facture");
  }
};

const updateBonCommande = async (req, res) => {
  try {
    console.log(req.body)
    const bonCommande = await BonCommande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(bonCommande);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de facture");
  }
};

const removeBonCommande = async (req, res) => {
  try {
    const bonCommande = await BonCommande.findByIdAndDelete(req.params.id);
    res.status(201).json(bonCommande);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de facture");
  }
};

module.exports = {
  addBonCommande,
  getAllBonCommandes,
  getOneBonCommande,
  updateBonCommande,
  removeBonCommande,
  // getSales,
  // getDashboardStats,
  prepareBonCommandeDetails,
};
