const Product = require("../Models/ProductSchema");
const Produit = require("../Models/ProductSchema")

const addProduit = async (req, res) => {
  try {
    const produitData = req.query;
    const produit = new Produit(produitData);
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du produit");
  }
}

const  getAllProduits = async (req, res) => {
  /*try {
    const  produits = await Produit.find();
    res.status(201).json(produits);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des produits");
  }*/
  try {
    // sort should look like this: { "champ": "userId", "ordre": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const products = await Produit.find({
      $or: [
        { name : { $regex: new RegExp(search, "i") }},
        { description : { $regex: new RegExp(search, "i") }},
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)


    const total = await Produit.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const totalItems = await Product.countDocuments();

    res.status(200).json({
      products,
      total,
      totalItems
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const  getOneProduit = async (req, res) => {
  try {
    const  produit = await Produit.findById(req.params.id);
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de produit");
  }
}

const  updateProduit = async (req,res)=>{
  try {
    const  produit = await Produit.findByIdAndUpdate(req.params.id, req.query, {new: true});
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de produit");
  }
}

const  removeProduit = async (req, res) => {
  try {
    const  produit = await Produit.findByIdAndDelete(req.params.id);
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de produit");
  }
}

module.exports = {addProduit,getAllProduits,getOneProduit,updateProduit,removeProduit};