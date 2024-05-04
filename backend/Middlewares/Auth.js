const jwt = require('jsonwebtoken');
const Entreprise = require("../Models/EntrepriseSchema")

const loginMiddleware  = async (req, res,next) =>{
  try {
    const {email,password} = req.data
    console.log("test")
    console.log(email, password)
    console.log('test if user existe')
    const user = await Entreprise.findOne({ email: email, password: password});
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    const jsenwebtkn = jwt.sign({ userId: user._id }, "AbdelilahElgallati1230");
    req.token = jsenwebtkn; 
    next(); 
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

module.exports = loginMiddleware;