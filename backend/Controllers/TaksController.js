const Taks = require("../Models/TaksShema")

const addTaks = async (req, res) => {
  try {
    console.log("hello");
    
    const TaksData = req.body.Taks;
    console.log(TaksData);
    const tk = new Taks(TaksData);
    await tk.save();
    res.status(201).json(Taks);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du Taks");
  }
}

const getAllTaksEnt = async (req, res) => {
  try {
    console.log("entrer to function");
    const tk = await Taks.find({ userId: req.params.id });
    res.status(201).json(tk);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des Taks");
  }
}

const  removeTaks = async (req, res) => {
  try {
    const  taks = await Taks.findByIdAndDelete(req.params.id);
    res.status(201).json(taks);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de categorie");
  }
}

module.exports = {addTaks,removeTaks,getAllTaksEnt};