const Subscription = require("../Models/SubscriptionSchema")

const addSubscription = async (req, res) => {
  try {
    const subscriptionData = req.query;
    const subscription = new Subscription(subscriptionData);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du subscription");
  }
}

const  getAllSubscriptions = async (req, res) => {
  try {
    const  subscription = await Subscription.find();
    res.status(201).json(subscription);
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
    const  subscription = await Subscription.findByIdAndUpdate(req.params.id, req.query, {new: true});
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