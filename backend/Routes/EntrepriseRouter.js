const express = require("express");
const EntrepriseRouter = express.Router();
const EntrepriseController = require("../Controllers/EntrepriseController");
const Auth = require("../Middlewares/Auth");


EntrepriseRouter.get( "/entreprisedetail/:id", EntrepriseController.getEntrepriseDetail);
EntrepriseRouter.get('/dashboard', EntrepriseController.getDashboardInfo); 
EntrepriseRouter.get('/EnterpriseStat', EntrepriseController.getEnterpriseCountByMonthAndYear);
EntrepriseRouter.get( "/", EntrepriseController.getAllEntreprises); 
EntrepriseRouter.get( "/:id", EntrepriseController.getOneEntreprise); 

EntrepriseRouter.post('/add', EntrepriseController.addEntreprise);
EntrepriseRouter.put('/edit/:id',EntrepriseController.updateEntreprise);
EntrepriseRouter.delete("/remove/:id",EntrepriseController.removeEntreprise);
EntrepriseRouter.post('/login',Auth, EntrepriseController.login);

module.exports = EntrepriseRouter;