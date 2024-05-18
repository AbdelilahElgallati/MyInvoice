const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cron = require("node-cron");
const passport = require("passport");
const session = require("express-session");
// const url = "mongodb://127.0.0.1:27017/MyInvoice";
const url = process.env.DATABASE_URL
const bodyParser = require("body-parser");
const app = express();
const Port = 3001;

const  OverallStat = require("../backend/Models/OverallStateSchema") ;
const {dataOverallStat}= require("../backend/data") ;
const CategorieRouter = require("./Routes/CategoryRouter");
const TaksRouter = require("./Routes/TaksRouter");
const ClientRouter = require("./Routes/ClientRouter");
const EntrepriseRouter = require("./Routes/EntrepriseRouter");
const InvoiceRouter = require("./Routes/InvoiceRouter");
const PackRouter = require("./Routes/PackRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ServiceRouter = require("./Routes/ServiceRouter");
const SettingRouter = require("./Routes/SettingsRouter");
const MessageRouter = require("./Routes/MessageRouter");
const SubscriptionRouter = require("./Routes/SubscriptionRouter");
const ModelRouter = require("./Routes/ModelRouter");
const FournisseurRouter = require('./Routes/FournisseurRouter');
const BonCommandesRouter = require('./Routes/BonCommandesRouter');
const BonLivraisonRouter = require('./Routes/BonLivraisonRouter');
const DeviRouter = require('./Routes/DeviRouter');
const DemandeRouter = require('./Routes/DemandeRouter');
const GoogleAuthRouter = require("./Routes/GoogleAuth");
const {
  updateSubscriptionStatus,
  EmailSubscriptionStatus,
} = require("./Controllers/SubscriptionController");

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: "https://my-invoice-seven.vercel.app/", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));
app.use(session({   
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/Categorie", CategorieRouter);
app.use("/Tax", TaksRouter);
app.use("/Client", ClientRouter);
app.use("/Fournisseur", FournisseurRouter);
app.use("/Entreprise", EntrepriseRouter);
app.use("/Invoice", InvoiceRouter);
app.use("/BonCommandes", BonCommandesRouter);
app.use("/BonLivraison", BonLivraisonRouter);
app.use("/Devi", DeviRouter);
app.use("/Demande", DemandeRouter);
app.use("/Pack", PackRouter);
app.use("/Message", MessageRouter); 
app.use("/Model", ModelRouter);
app.use("/Produit", ProductRouter);
app.use("/Service", ServiceRouter);
app.use("/Setting", SettingRouter);
app.use("/Subscription", SubscriptionRouter);
app.use("/", GoogleAuthRouter);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connecting to my database in port : " + Port);
  })
  .catch((err) => {
    console.log(err);
  });

cron.schedule(
  "15 17 * * *",
  () => {
    updateSubscriptionStatus();
    EmailSubscriptionStatus();
  },
  {
    timezone: "Africa/Casablanca",
  }
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err, message: "Something went wrong!" });
});

app.listen(Port, () => {
  // OverallStat.insertMany(dataOverallStat)
  console.log("the platform is running well");
});
