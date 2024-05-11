const Produit = require("../Models/ProductSchema")

const addProduit = async (req, res) => {
  try {
    //console.log("req.body : ", req.body)
    const produitData = req.body.produit;
    const produit = new Produit(produitData);
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du produit");
  }
}

const  getAllProduitsEnt = async (req, res) => {try {
  const Allproducts = await Produit.find().populate("categoryId");
  const products = Allproducts.filter(produit => produit.userId.toString() === req.params.id);

  const productsEnt = products.map(produit => ({
    _id: produit._id,
    userId: produit.userId,
    name: produit.name,
    description: produit.description,
    quantity: produit.quantity,
    price: produit.price,
    categoryName: produit.categoryId.categoryName // Récupère le nom de la catégorie associée
  }));

  res.status(200).json(
    productsEnt);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const  getOneProduit = async (req, res) => {
  try {
    const  produit = await Produit.findById(req.params.id);
<<<<<<< HEAD
    console.log("one produit : ", produit)
=======
    
>>>>>>> 1f82e7994f9847912b2037ceccd0d3359a8f9843
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de produit");
  }
}

const  updateProduit = async (req,res)=>{
  try {
    const  produit = await Produit.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de produit");
  }
}

const  removeProduit = async (req, res) => {
  try {
    //console.log("id : ", req.params.id)
    const  produit = await Produit.findByIdAndDelete(req.params.id);
    res.status(201).json(produit);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de produit");
  }
}

module.exports = {addProduit,getAllProduitsEnt,getOneProduit,updateProduit,removeProduit};