const Subscription = require("../Models/SubscriptionSchema")

const addSubscription = async (req, res) => {
  try {
    const subscriptionData = req.body;
    const subscription = new Subscription(subscriptionData);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du subscription");
  }
}

const  getAllSubscriptions = async (req, res) => {
  try {
    const  subscription = await Subscription.find().populate('userId', 'name').populate('packId', 'name price');
    // Créer un tableau pour stocker les informations organisées de chaque souscription
    const organizedSubscriptions = subscription.map(subscription => {
      // Formater la date de début
      const startDate = new Date(subscription.startDate).toLocaleDateString('fr-FR');
      
      // Formater la date de fin
      const endDate = new Date(subscription.endDate).toLocaleDateString('fr-FR');
      
      return {
        _id: subscription._id,
        enterpriseId: subscription.userId._id,
        enterpriseName: subscription.userId.name,
        packId: subscription.packId._id,
        packName: subscription.packId.name,
        packPrice: subscription.packId.price,
        startDate: startDate,
        endDate: endDate,
        price: subscription.price,
        status: subscription.status
      };
    });
    res.status(201).json(organizedSubscriptions);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des subscription");
  }
}

const  getOneSubscription = async (req, res) => {
  try {
    const  subscription = await Subscription.findById(req.params.id);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de subscription");
  }
}

const  updateSubscription = async (req,res)=>{
  try {
    const  subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de subscription");
  }
}

const  removeSubscription = async (req, res) => {
  try {
    const  subscription = await Subscription.findByIdAndDelete(req.params.id);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de subscription");
  }
}

module.exports = {addSubscription,getAllSubscriptions,getOneSubscription,updateSubscription,removeSubscription};