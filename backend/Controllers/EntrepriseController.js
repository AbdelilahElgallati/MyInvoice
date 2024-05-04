const Entreprise = require("../Models/EntrepriseSchema");
const Subscription = require("../Models/SubscriptionSchema");
const Invoice = require("../Models/InvoiceSchema");
const Pack = require('../Models/PackSchema')
const jwt = require("jsonwebtoken");
const SubscriptionController = require("../Controllers/SubscriptionController")

const addEntreprise = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      logo,
      passwordConfirmation,
    } = req.data;
    const existeEntreprise = await Entreprise.findOne({ email: email });
    if (!existeEntreprise && password === passwordConfirmation) {
      const entreprise = new Entreprise({
        name,
        email,
        password,
        phone,
        address,
        logo,
      });
      await entreprise.save();
      res.status(201).json(entreprise);
    } else {
      res
        .status(400)
        .json({
          message:
            "L'entreprise existe déjà ou les mots de passe ne correspondent pas",
        });
    }
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout d'entreprise");
  }
};

const getAllEntreprises = async (req, res) => {
  try {
    const entreprises = await Entreprise.find();
    res.status(201).json(entreprises);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche d'entreprise");
  }
};

const getOneEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findById(req.params.id);
    res.status(201).json(entreprise);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche d'entreprise");
  }
};

const getEntrepriseDetail = async (req, res) => {
  try {
    const entreprise = await Entreprise.findById(req.params.id);
    const subscriptions = await Subscription.find();
    const filteredSubscriptions = subscriptions.find(subscription => subscription.userId.toString() === entreprise._id.toString());
    const packEntreprise = await Pack.find();
    const filteredpackEntreprise = packEntreprise.find(pack => {
      return filteredSubscriptions && filteredSubscriptions.packId.toString() === pack._id.toString();
    });
    const startDate = new Date(filteredSubscriptions.startDate).toLocaleDateString('fr-FR');
    const endDate = new Date(filteredSubscriptions.endDate).toLocaleDateString('fr-FR');
    const entrepriseDetail = {
      _id : entreprise._id,
      name : entreprise.name,
      email : entreprise.email,
      phone : entreprise.phone,
      address : entreprise.address,
      logo : entreprise.logo,
      subscriptionStatue : filteredSubscriptions.status,
      subscriptionStartDate : startDate,
      subscriptionEndDate : endDate,
      pack : filteredpackEntreprise.name,
      price : filteredpackEntreprise.price,
    };
    res.status(200).json(entrepriseDetail);
  } catch (error) {
    console.error("Error occurred: ", error);
    res.status(500).send("Erreur serveur lors de la recherche d'entreprise");
  }
};


const updateEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByIdAndUpdate(
      req.params.id,
      req.data,
      { new: true }
    );
    res.status(201).json(entreprise);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour d'entreprise");
  }
};

const removeEntreprise = async (req, res) => {
  try {
    const entreprise = await Entreprise.findByIdAndDelete(req.params.id);
    res.status(201).json(entreprise);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression d'entreprise");
  }
};

const login = async (req, res) => {
  try {
    const jsenwebtkn = req.token;
    const decoded = jwt.verify(jsenwebtkn, "AbdelilahElgallati1230");
    const userId = decoded.userId;
    const user = await Entreprise.findById(userId);
    res.json({ jsenwebtkn, user });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getDashboardInfo = async (req, res) => {
  try {
    const totalEntreprises = await Entreprise.countDocuments();
    const revenueBySubscription = await Subscription.aggregate([
      { $group: { _id: "$packId", totalRevenue: { $sum: "$price" } } },
    ]);
    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ status: "paid" });
    const unpaidInvoices = await Invoice.countDocuments({
      status: { $ne: "paid" },
    });
    const subscriptionCounts = await Subscription.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const enterpriseCountByMonthAndYear = getEnterpriseCountByMonthAndYear();
    const dashboardData = {
      totalEntreprises,
      revenueBySubscription,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      subscriptionCounts,
      enterpriseCountByMonthAndYear,
    };
    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Erreur : ", error);
    res
      .status(500)
      .send(
        "Erreur serveur lors de la recherche d'informations du tableau de bord"
      );
  }
};

const getEnterpriseCountByMonthAndYear = async(req, res) => {
  try {
    const enterpriseCountByMonthAndYear = await Entreprise.aggregate([
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    res.status(200).json(enterpriseCountByMonthAndYear);
  } catch (error) {
    
  }
}

module.exports = {
  getDashboardInfo,
  addEntreprise,
  getAllEntreprises,
  getOneEntreprise,
  updateEntreprise,
  removeEntreprise,
  login,
  getEnterpriseCountByMonthAndYear,
  getEntrepriseDetail,
};
