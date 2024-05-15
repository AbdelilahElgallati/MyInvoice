const Entreprise = require("../Models/EntrepriseSchema");
const Subscription = require("../Models/SubscriptionSchema");
const Invoice = require("../Models/InvoiceSchema");
const Pack = require('../Models/PackSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')

const addEntreprise = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const existeEntreprise = await Entreprise.findOne({ email: email });
    if (!existeEntreprise) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const logo = req.file ? req.file.filename : null;
      const entreprise = new Entreprise({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        logo,
      });
      await entreprise.save();
      const subscription = new Subscription({
        userId: entreprise._id,
        packId: '6631005f1c1fec2176ead2cb',
        startDate: Date.now(),
        endDate: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
        status: "active",
        price: 0,
      })
      subscription.save()
      return res.status(201).json(entreprise);
    } else {
      return res.status(400).json({ message: "L'entreprise existe déjà" });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'entreprise :", error);
    return res
      .status(500)
      .send("Erreur serveur lors de l'ajout d'entreprise");
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

const getEntrepriseByGoogleId = async (req, res) => {
  try {
    const entreprise = await Entreprise.findOne({googleId: req.id});
    return entreprise;
  } catch (error) {
    console.error("Erreur serveur lors de la recherche d'entreprise");
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
      packId: filteredpackEntreprise._id,
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
    const logo = req.file ? req.file.filename : null;
    let { name, email, phone, address } = req.body;
    const updatedEntrepriseData = {name, email, phone, address};
    if (logo) {
      updatedEntrepriseData.logo = logo;
    }
    const entreprise = await Entreprise.findByIdAndUpdate(
      req.params.id,
      updatedEntrepriseData,
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
    const user = req.user;
    const sub = await Subscription.findOne({userId: user._id});
    const pack = await Pack.findById(sub.packId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ jsenwebtkn, user, pack  });
  } catch (error) {
    console.error(error);
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
const ForgoutPass = async (req, res)=>{
    console.log(req.body)
    const {email} = req.body;
    Entreprise.findOne({email : email}).then (entreprise=>{
      if(!entreprise){
        return res.send({Status : "User not existed"})
      }
      const token = jwt.sign({id : entreprise._id} , "AbdelilahElgallati1230",{expiresIn:"1d"})
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "myinvoice06@gmail.com",
          pass: "ekiv afoc wbnb mrep",
        },
      });
      
      var mailOptions = {
        from: 'myinvoice06@gmail.com',
        to: email,
        subject: 'Reset password',
        text: `http://localhost:3000/reset-password/${entreprise._id}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
         return res.send({Status : "Succes"})
        }
      });
    })
}
const ResetPass = async(req,res)=>{
   console.log(req.body)
   const id  = req.body.id;
   const token  = req.body.token;
   const password= req.body.password;
    console.log(password);
   jwt.verify(token , "AbdelilahElgallati1230" , (err,decoded)=>{
    if(err){
      return res.json({Status : "Error with token"})
    }else{
        bcrypt.hash(password ,10).then(
          hash=>{
            Entreprise.findByIdAndUpdate({_id :id},{password : hash})
            .then(u=> res.send({Status : "Success"}))
            .catch(err=>res.send({Status:err}))
          }
        ).catch(err=>res.send({Status:err}))
      }
   })
}

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await Entreprise.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
      }
    }
  } catch (error) {
    console.log(error)
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
  getEntrepriseByGoogleId,
  ForgoutPass,
  ResetPass,
  changePassword,
};
