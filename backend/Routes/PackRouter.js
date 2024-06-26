const express = require("express");
const PackRouter = express.Router();
const PackController = require("../Controllers/PackController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

PackRouter.get( "/ThreePacks", PackController.getThreePacks);
PackRouter.get( "/AllPacksThreeService", PackController.getAllPacksThreeService);
PackRouter.get( "/", PackController.getAllPacks); 
PackRouter.get( "/:id", PackController.getOnePack);
PackRouter.post('/add', PackController.addPack);
PackRouter.put('/edit/:id', upload.single('logo'), PackController.updatePack);
PackRouter.delete("/remove/:id",PackController.removePack);

module.exports = PackRouter;