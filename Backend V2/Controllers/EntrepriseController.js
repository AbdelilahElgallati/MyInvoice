const Entreprise = require("../Models/EntrepriseSchema")
const jwt = require('jsonwebtoken');

const addEntreprise = async (req, res) => {
  try {
    const { name, email, password, phone, address, logo, passwordConfirmation } = req.query;
    const existeEntreprise = await Entreprise.findOne({ email: email})
    if(!existeEntreprise && password === passwordConfirmation) {
      const entreprise = new Entreprise({ name, email, password, phone, address, logo });
      await entreprise.save();
      res.status(201).json(entreprise);
    } else {
      res.status(400).json({ message: "L'entreprise existe déjà ou les mots de passe ne correspondent pas" });
    }
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout d'entreprise");
  }
}

const  getAllEntreprises = async (req, res) => {
  try {
    const  entreprises = await Entreprise.find();
    res.status(201).json(entreprises);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche d'entreprise");
  }
}

const  getOneEntreprise = async (req, res) => {
  try {
    const  entreprise = await Entreprise.findById(req.params.id);
    res.status(200).json(entreprise);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche d'entreprise");
  }
}

const  updateEntreprise = async (req,res)=>{
  try {
    const  entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.query, {new: true});
    res.status(201).json(entreprise);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour d'entreprise");
  }
}

const  removeEntreprise = async (req, res) => {
  try {
    const  entreprise = await Entreprise.findByIdAndDelete(req.params.id);
    res.status(201).json(entreprise);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression d'entreprise");
  }
}

const login  = async (req, res) =>{
  try {
    const jsenwebtkn = req.token;
    const decoded = jwt.verify(jsenwebtkn, "AbdelilahElgallati1230");
    const userId = decoded.userId;
    const user = await Entreprise.findById(userId);
    res.json({ jsenwebtkn, user }); 
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}


module.exports = {addEntreprise,getAllEntreprises,getOneEntreprise,updateEntreprise,removeEntreprise,login};