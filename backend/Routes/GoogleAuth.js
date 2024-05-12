const express = require("express");
const GoogleAuthRouter = express.Router();
const passport = require("passport");
const GoogleAuthControllers = require('../Controllers/GoogleAuthController')(passport);

GoogleAuthRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

GoogleAuthRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3001/Api/auth/google' }),
  function(req, res) {
    // Redirection vers la page d'accueil après une connexion réussie
    res.redirect(`http://localhost:3000?email=${req.user.email}&fullname=${req.user.name}&secret=${req.user.secret}`);
  });

module.exports = GoogleAuthRouter;

