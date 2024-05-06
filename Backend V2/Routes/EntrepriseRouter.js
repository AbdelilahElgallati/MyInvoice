const express = require("express");
const EntrepriseRouter = express.Router();
const EntrepriseController = require("../Controllers/EntrepriseController");
const Auth = require("../Middlewares/Auth");
// const multer = require( 'multer' );

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, '../Public/Images');
//   },
//   filename: function(req, file, cb){
//     return cb(null, `${Date.now()}__${file.originalname}`);
//   }
// })

// const uplode = multer({storage});

// EntrepriseRouter.post('/add', uplode.single('logo'), EntrepriseController.addEntreprise);


EntrepriseRouter.get( "/", EntrepriseController.getAllEntreprises); 
EntrepriseRouter.get( "/:id", EntrepriseController.getOneEntreprise); 
EntrepriseRouter.post('/add', EntrepriseController.addEntreprise);
EntrepriseRouter.put('/edit/:id',EntrepriseController.updateEntreprise);
EntrepriseRouter.delete("/remove/:id",EntrepriseController.removeEntreprise);
EntrepriseRouter.post('/login',Auth, EntrepriseController.login);

module.exports = EntrepriseRouter;