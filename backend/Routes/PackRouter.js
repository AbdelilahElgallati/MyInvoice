const express = require("express");
const PackRouter = express.Router();
const PackController = require("../Controllers/PackController");

PackRouter.get( "/ThreePacks", PackController.getThreePacks);
PackRouter.get( "/AllPacksThreeService", PackController.getAllPacksThreeService);
PackRouter.get( "/", PackController.getAllPacks); 
PackRouter.get( "/:id", PackController.getOnePack); 
PackRouter.post('/add',PackController.addPack);
PackRouter.put('/edit/:id',PackController.updatePack);
PackRouter.delete("/remove/:id",PackController.removePack);

module.exports = PackRouter;