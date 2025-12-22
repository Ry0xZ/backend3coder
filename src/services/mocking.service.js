const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const generatePets = (cant = 1) => {
  return Array.from({ length: cant }, () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.firstName(),
    age: faker.number.int({ min: 1, max: 20 }),
    species: faker.animal.type(),
    __v: 0
  }));
};

const generateUsers = async (cant = 1) => {
  const passwordHash = await bcrypt.hash("coder123", 10);

  return Array.from({ length: cant }, () => {
    const unique = faker.string.alphanumeric(6).toLowerCase();
    return {
      _id: faker.database.mongodbObjectId(),
      name: faker.person.firstName(),
      age: faker.number.int({ min: 18, max: 60 }),
      email: `${faker.internet.email().toLowerCase().replace("@", `.${unique}@`)}`,
      password: passwordHash,
      role: Math.random() < 0.5 ? "user" : "admin",
      pets: [],
      __v: 0
    };
  });
};

module.exports = { generateUsers, generatePets };