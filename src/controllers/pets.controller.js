const petsService = require("../services/pets.service");

const getPets = async (req, res) => {
  try {
    const pets = await petsService.getAll();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { getPets };