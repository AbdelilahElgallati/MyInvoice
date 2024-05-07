const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require ("helmet");
const morgan = require ("morgan");
const url = "mongodb://127.0.0.1:27017/MyInvoice";
const app = express();
const Port = 3001;

const CategorieRouter = require("./Routes/CategoryRouter");
const ClientRouter = require("./Routes/ClientRouter");
const EntrepriseRouter = require("./Routes/EntrepriseRouter");
const InvoiceRouter = require("./Routes/InvoiceRouter");
const PackRouter = require("./Routes/PackRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ServiceRouter = require("./Routes/ServiceRouter");
const SettingRouter = require("./Routes/SettingsRouter");
const MessageRouter = require("./Routes/MessageRouter");
const SubscriptionRouter = require("./Routes/SubscriptionRouter");

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Public'));

app.use("/Api/Categorie", CategorieRouter);
app.use("/Api/Client", ClientRouter);
app.use("/Api/Entreprise", EntrepriseRouter);
app.use("/Api/Invoice", InvoiceRouter);
app.use("/Api/Pack", PackRouter);
app.use("/Api/Message", MessageRouter);
app.use("/Api/Produit", ProductRouter);
app.use("/Api/Service", ServiceRouter);
app.use("/Api/Setting", SettingRouter);
app.use("/Api/Subscription", SubscriptionRouter);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connecting to my database in port : " + Port);
  })
  .catch((err) => {
    console.log(err);
});

app.listen(Port, () => {
  console.log("the platform is running well");
});