const Category = require("../Models/CategorySchema")

const addCategory = async (req, res) => {
  try {
    const categoryData = req.query;
    const category = new Category(categoryData);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du categorie");
  }
}

const  getAllCategories = async (req, res) => {
  try {
    const  categories = await Category.find();
    res.status(201).json(categories);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des categories");
  }
}

const  getOneCategory = async (req, res) => {
  try {
    const  categorie = await Category.findById(req.params.id);
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de categorie");
  }
}

const  updateCategory = async (req,res)=>{
  try {
    const  categorie = await Category.findByIdAndUpdate(req.params.id, req.query, {new: true});
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de categorie");
  }
}

const  removeCategory = async (req, res) => {
  try {
    const  categorie = await Category.findByIdAndDelete(req.params.id);
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de categorie");
  }
}

module.exports = {addCategory,getAllCategories,getOneCategory,updateCategory,removeCategory};