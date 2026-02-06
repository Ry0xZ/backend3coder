const petRepository = require("../repositories/pet.repository");

class PetsService {
  async getAll() {
    return petRepository.getAll();
  }

  async insertMany(pets) {
    if (!Array.isArray(pets) || pets.length === 0) return [];
    return petRepository.insertMany(pets);
  }
}

module.exports = new PetsService();