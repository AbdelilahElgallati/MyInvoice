const Model = require("../Models/ModelSchema");
const cloudinary = require("../Utils/cloudinary");

const addModel = async (req, res) => {
  try {
    const ModelData = req.body;
    const result = await cloudinary.uploader.upload(ModelData.icon, {
      folder: "Model",
    });
    const model = new Model({
      name: ModelData.name,
      description: ModelData.description,
      icon: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await model.save();
    res.status(201).json({ success: true, model });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur serveur lors de l'ajout du model",
      error,
    });
  }
};

const getAllModels = async (req, res) => {
  try {
    const models = await Model.find();
    console.log("Model : ", models);
    res.status(201).json(models);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des Models");
  }
};

const getOneModel = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    res.status(201).json(model);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de Model");
  }
};

const updateModel = async (req, res) => {
  try {
    const currentModel = await Model.findById(req.params.id);
    const data = {
      name: req.body.name,
      description: req.body.description,
    };
    if (req.body.icon !== "") {
      const ImgId = currentPack.icon.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.icon, {
        folder: "Model",
      });

      data.icon = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const updatedModel = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      success: true,
      updatedModel,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erreur serveur lors de la mise à jour du model",
      error,
    });
  }
};

const removeModel = async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);
    res.status(201).json(model);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de Model");
  }
};

module.exports = {
  addModel,
  getAllModels,
  getOneModel,
  updateModel,
  removeModel,
};
