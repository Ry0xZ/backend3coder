const { generateUsers, generatePets } = require("../services/mocking.service");
const User = require("../models/user.model");
const Pet = require("../models/pet.model");

const getMockingPets = (req, res) => {
  const cant = Number(req.query.cant) || 50;
  const pets = generatePets(cant);
  res.json({ status: "success", payload: pets });
};

const getMockingUsers = async (req, res) => {
  // Consigna: 50 usuarios
  const users = await generateUsers(50);
  res.json({ status: "success", payload: users });
};

const postGenerateData = async (req, res) => {
  try {
    const usersCount = Number(req.body.users) || 0;
    const petsCount = Number(req.body.pets) || 0;

    if (usersCount < 0 || petsCount < 0) {
      return res.status(400).json({ status: "error", message: "users y pets deben ser >= 0" });
    }

    const usersMock = usersCount ? await generateUsers(usersCount) : [];
    const petsMock = petsCount ? generatePets(petsCount) : [];

    const usersToInsert = usersMock.map(({ __v, ...u }) => u);
    const petsToInsert = petsMock.map(({ __v, ...p }) => p);

    const insertedUsers = usersToInsert.length
      ? await User.insertMany(usersToInsert, { ordered: false })
      : [];
    const insertedPets = petsToInsert.length
      ? await Pet.insertMany(petsToInsert, { ordered: false })
      : [];

    res.json({
      status: "success",
      message: "Datos generados e insertados correctamente",
      inserted: { users: insertedUsers.length, pets: insertedPets.length }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { getMockingPets, getMockingUsers, postGenerateData };