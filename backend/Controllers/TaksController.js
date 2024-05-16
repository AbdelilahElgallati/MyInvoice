const Taks = require("../Models/TaksShema")

const addTaks = async (req, res) => {
  try {
    const TaksData = req.body.Taks;
    const Taks = new Taks(TaksData);
    await Taks.save();
    res.status(201).json(Taks);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du categorie");
  }
}

const getAllTaksEnt = async (req, res) => {
  try {
    const Taks = await Taks.find({ userId: req.params.id });
    res.status(201).json(Taks);
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