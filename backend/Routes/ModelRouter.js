const express = require("express");
const ModelRouter = express.Router();
const ModelController = require("../Controllers/ModelController");

ModelRouter.get( "/", ModelController.getAllModels); 
ModelRouter.get( "/:id", ModelController.getOneModel); 
ModelRouter.post('/add',ModelController.addModel);
ModelRouter.put('/edit/:id',ModelController.updateModel);
ModelRouter.delete("/remove/:id",ModelController.removeModel);

module.exports = ModelRouter;