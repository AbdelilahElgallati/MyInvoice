const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = "mongodb://127.0.0.1:27017/MyInvoice";
const app = express();
const dotenv = require("dotenv");
const helmet = require ("helmet");
const morgan = require ("morgan");

const CategorieRouter = require("./Routes/CategoryRouter");
const ClientRouter = require("./Routes/ClientRouter");
const EntrepriseRouter = require("./Routes/EntrepriseRouter");
const InvoiceRouter = require("./Routes/InvoiceRouter");
const PackRouter = require("./Routes/PackRouter");
const ProductRouter = require("./Routes/ProductRouter");
const SettingRouter = require("./Routes/SettingsRouter");
const SubscriptionRouter = require("./Routes/SubscriptionRouter");
const{ dataOverallStat} = require ("../backend/data.js");
const OverallStat = require("./Models/OverallStateSchema");
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/Api/Categorie", CategorieRouter);
app.use("/Api/Client", ClientRouter);
app.use("/Api/Entreprise", EntrepriseRouter);
app.use("/Api/Invoice", InvoiceRouter);
app.use("/Api/Pack", PackRouter);
app.use("/Api/Produit", ProductRouter);
app.use("/Api/Setting", SettingRouter);
app.use("/Api/Subscription", SubscriptionRouter);

mongoose
  .connect(url)
  .then(() => {
    console.log("connecting to my database");
  })
  .catch((err) => {
    console.log(err);
});

app.listen(3001, () => {
  console.log("the platform is running well");
});