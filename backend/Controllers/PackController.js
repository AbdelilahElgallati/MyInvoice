const Pack = require("../Models/PackSchema");
const Service = require("../Models/ServiceSchema");
const mongoose = require("mongoose");
const cloudinary = require("../Utils/cloudinary");

const addPack = async (req, res) => {
  try {
    const packData = req.body;
    const result = await cloudinary.uploader.upload(packData.logo, {
      folder: "Pack",
    });
    const pack = new Pack({
      name: packData.name,
      description: packData.description,
      services: packData.services,
      price: packData.price,
      logo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await pack.save();
    res.status(201).json({ success: true, pack });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Erreur serveur lors de l'ajout de pack : ${error}`,
      error,
    });
  }
};

const getAllPacks = async (req, res) => {
  try {
    const packs = await Pack.find().populate("services.serviceId");
    res.status(201).json(packs);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des packs");
  }
};
const getThreePacks = async (req, res) => {
  try {
    const packs = await Pack.find()
      .populate({
        path: "services.serviceId",
        model: "Service",
        select: "ServiceName",
      })
      .limit(3);
    packs.forEach((pack) => {
      pack.services = pack.services.slice(0, 3);
    });
    res.status(200).json(packs);
  } catch (error) {
    console.error("error", error);
    res.status(500).send("Erreur serveur lors de la recherche des packs");
  }
};

const getAllPacksThreeService = async (req, res) => {
  try {
    const packs = await Pack.find().populate({
      path: "services.serviceId",
      model: "Service",
      select: "ServiceName",
    });

    // Limiter le nombre de services pour chaque pack à 3
    packs.forEach((pack) => {
      pack.services = pack.services.slice(0, 3);
    });
    res.status(200).json(packs);
  } catch (error) {
    console.error("error", error);
    res.status(500).send("Erreur serveur lors de la recherche des packs");
  }
};

const getOnePack = async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de pack");
  }
};

const updatePack = async (req, res) => {
  try {
    const currentPack = await Pack.findById(req.params.id);
    const data = {
      name: req.body.name,
      description: req.body.description,
      services: JSON.parse(req.body.services),
      price: req.body.price,
    };
    if (req.body.logo !== "") {
      const ImgId = currentPack.logo.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "Pack",
        // width: 1000,
        // crop: "scale",
      });

      data.logo = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }
    const updatedPack = await Pack.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      success: true,
      updatedPack,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Erreur serveur lors de la mise à jour de pack",
        error,
      });
  }
};

const removePack = async (req, res) => {
  try {
    const pack = await Pack.findByIdAndDelete(req.params.id);
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de pack");
  }
};

module.exports = {
  addPack,
  getAllPacks,
  getThreePacks,
  getOnePack,
  updatePack,
  removePack,
  getAllPacksThreeService,
};
