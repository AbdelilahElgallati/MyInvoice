const BonLivraison = require("../Models/BonLivraisonModel");
const Fournisseur = require("../Models/FournisseurSchema");
const Product = require("../Models/ProductSchema");
const nodemailer = require("nodemailer");

const addBonLivraison = async (req, res) => {
  try {
    const bonLivraison = new BonLivraison(req.body.bonLivraison);
    await bonLivraison.save();
    res.status(201).json(bonLivraison);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout de facture");
  }
};

const getAllBonLivraisons = async (req, res) => {
  try {
    console.log("start");
    const AllbonLivraisons = await BonLivraison.find({active:true})
      .populate("bonCommandeId")
      .limit(50)
      .sort({ createdOn: -1 });
    const bonLivraisons = AllbonLivraisons.filter(
      (bonLivraison) => bonLivraison.userId.toString() === req.params.id
    );
    console.log(bonLivraisons);
    res.status(200).json(bonLivraisons);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const prepareBonLivraisonDetails = async (req, res) => {
  try {
    const bonLivraison = await BonLivraison.findById(req.params.id)
      .populate("userId", "name email phone address logo")
      .populate("bonCommandeId");

    const fournisseur = await Fournisseur.findById(
      bonLivraison.bonCommandeId.fournisseurId
    );
    const formattedDateLivraison = formatDate(bonLivraison.dateLivraison);
    // Récupérer les détails des produits en parallèle
    const itemsPromises = bonLivraison.bonCommandeId.items.map(async (item) => {
      const produit = await Product.findById(item.productId);
      return {
        productName: produit.name,
        quantity: item.quantity,
        price: produit.price,
      };
    });

    // Attendre toutes les promesses pour récupérer les détails des produits
    const itemsTable = await Promise.all(itemsPromises);

    const _id = bonLivraison._id;
    const bonLivraisonStatus = bonLivraison.status;
    const userName = bonLivraison.userId.name;
    const userEmail = bonLivraison.userId.email;
    const userPhone = bonLivraison.userId.phone;
    const userAddress = bonLivraison.userId.address;
    const userLogo = bonLivraison.userId.logo;
    const fournisseurName = fournisseur.name;
    const fournisseurEmail = fournisseur.email;
    const fournisseurPhone = fournisseur.phone;
    const fournisseurAddress = fournisseur.address;
    const amount = bonLivraison.amount;

    console.log(
      _id,
      bonLivraisonStatus,
      userName,
      userEmail,
      userPhone,
      userAddress,
      userLogo,
      fournisseurName,
      fournisseurEmail,
      fournisseurPhone,
      fournisseurAddress,
      formattedDateLivraison,
      itemsTable,
      amount
    );
    res.status(200).json({
      _id,
      bonLivraisonStatus,
      userName,
      userEmail,
      userPhone,
      userAddress,
      userLogo,
      fournisseurName,
      fournisseurEmail,
      fournisseurPhone,
      fournisseurAddress,
      formattedDateLivraison,
      itemsTable,
      amount,
    });
  } catch (error) {
    console.error("Error fetching bonLivraison details:", error.message);
    throw error;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString);
    return "";
  }
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("fr-FR", options);
};

const getOneBonLivraison = async (req, res) => {
  try {
    const bonLivraison = await BonLivraison.findById(req.params.id);
    res.status(201).json(bonLivraison);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de facture");
  }
};

const updateBonLivraison = async (req, res) => {
  try {
    console.log(req)
    const bonLivraison = await BonLivraison.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(bonLivraison);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de facture");
  }
};

const removeBonLivraison = async (req, res) => {
  try {
    const bonLivraison = await BonLivraison.findByIdAndDelete(req.params.id);
    res.status(201).json(bonLivraison);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de facture");
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "myinvoice06@gmail.com",
    pass: "ekiv afoc wbnb mrep",
  },
});

const sendEmail = async (req, res) => {
  const { fournisseurEmail, fournisseurName, userName, _id, itemsTable, amount, formattedDateLivraison, userPhone, userAddress, userEmail } = req.body;
  const itemsTableHTML = itemsTable.map(item => `<tr><td>${item.productName}</td><td>${item.quantity}</td><td>${item.price.toFixed(2)} DHs</td></tr>`).join('');
  const body = `
  <p>Cher Client(e) Mr/Mme.<strong> ${fournisseurName}</strong>,</br></p>
  <p>Vous avez reçu une bon de livraison de l'entreprise <strong><i>${userName}</i></strong>, vérifiez les détails ci-dessous:</br></p>
  <p> - Numéro de bon de livraison :<strong> #${_id}</strong></p></br>
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th><strong>Nom du Produit</strong></th>
        <th><strong>Quantité</strong></th>
        <th><strong>Prix</strong></th>
      </tr>
    </thead>
    <tbody>
      ${itemsTableHTML}
    </tbody>
    <tfoot>
      <tr>
        <th><strong>Montant : </strong></th>
        <td colspan="2"> <strong>${amount.toFixed(2)} DHs</strong> </td>
      </tr>
    </tfoot>
  </table>
  </br>
  <p>Considérez s'il vous plaît que la date de livraison de votre bon de livraison est le <strong>"<font color="red">${formattedDateLivraison}</font>"</strong>.</p></br>
  <p>Si vous avez des questions, vous trouverez ci-dessus les coordonnées de l'entreprise :</p></br>
  <ul>
    <li> Téléphone :<strong> ${userPhone}</strong></li>
    <li> Adresse :<strong> ${userAddress}</strong></li>
    <li> Email :<strong> ${userEmail}</strong></li>
  </ul></br>
  <p>Cordialement,</p></br>
  <p><strong>MY INVOICE TEAM</strong></p>
`;
  var mailOptions = {
    from: "myinvoice06@gmail.com",
    to: fournisseurEmail,
    subject: `Facture envoyée depuis ${userName}`,
    html: body,
  }
  try {
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' }); 
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = {
  addBonLivraison,
  getAllBonLivraisons,
  getOneBonLivraison,
  updateBonLivraison,
  removeBonLivraison,
  prepareBonLivraisonDetails,
  sendEmail,
};
