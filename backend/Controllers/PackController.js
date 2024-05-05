const Pack = require("../Models/PackSchema");
const Service = require("../Models/ServiceSchema");

// const addPack = async (req, res) => {
//   try {
//     const packData = req.body;
//     console.log("packData : ", packData.pack)
//     const pack = new Pack(packData.pack);
//     console.log("pack : ", pack)
//     await pack.save();
//     res.status(201).json(pack);
//   } catch (error) {
//     res.status(500).send("Erreur serveur lors de l'ajout du pack");
//   }
// }

const addPack = async (req, res) => {
  try {
    const packData = req.body.pack;
    const serviceIds = packData.services; 
    const pack = new Pack({
      name: packData.name,
      description: packData.description,
      services: serviceIds.map(serviceId => ({ serviceId })), 
      price: packData.price,
      startDate: packData.startDate,
      endDate: packData.endDate
    });
    await pack.save();
    res.status(201).json(pack);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erreur serveur lors de l'ajout du pack");
  }
}

const  getAllPacks = async (req, res) => {
  try {
    const packs = await Pack.find().populate('services.serviceId');
    res.status(201).json(packs);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche des packs");
  }
}

const  getOnePack = async (req, res) => {
  try {
    const  pack = await Pack.findById(req.params.id);
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de pack");
  }
}

const  updatePack = async (req, res) => {
  try {

    const { name, description, services, price, startDate, endDate } = req.body;
    const formattedServices = services.map(serviceId => ({ serviceId }));
    const updatedPack = await Pack.findByIdAndUpdate(
      req.params.id,
      { name, description, services: formattedServices, price, startDate, endDate },
      { new: true }
    );
    res.status(201).json(updatedPack);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de pack");
  }
}

const  removePack = async (req, res) => {
  try {
    const  pack = await Pack.findByIdAndDelete(req.params.id);
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de pack");
  }
}

module.exports = {addPack,getAllPacks,getOnePack,updatePack,removePack};