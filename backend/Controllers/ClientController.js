const Client = require("../Models/ClientSchema")

const addClient = async (req, res) => {
  try {
    const ClientData = req.body;
    const client = new Client(ClientData);
    await client.save();
    res.status(201).json(Client);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de l'ajout du client");
  }
}

const  getAllClients = async (req, res) => {try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const clients = await Client.find({
      $or: [
        { name : { $regex: new RegExp(search, "i") }},
        { email : { $regex: new RegExp(search, "i") }},
        { phone : { $regex: new RegExp(search, "i") } },
        { address : { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Client.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const totalItems = await Client.countDocuments();

    res.status(200).json({
      clients,
      total,
      totalItems
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


const  getOneClient = async (req, res) => {
  try {
    const  client = await Client.findById(req.params.id);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la recherche de client");
  }
}

const  updateClient = async (req,res)=>{
  try {
    const  client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json(client);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la mise à jour de client");
  }
}

const  removeClient = async (req, res) => {
  try {
    const  client = await Client.findByIdAndDelete(req.params.id);
    res.status(201).json(client);
  } catch (error) {
    res.status(500).send("Erreur serveur lors de la suppression de client");
  }
}

module.exports = {addClient,getAllClients,getOneClient,updateClient,removeClient};