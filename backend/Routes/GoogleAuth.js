const express = require("express");
const GoogleAuthRouter = express.Router();
const GoogleAuthControllers = require('../Controllers/GoogleAuthController')
GoogleAuthRouter.get( "/", GoogleAuthControllers.Googleauth); 
module.exports = GoogleAuthRouter;
 
