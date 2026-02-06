const adoptionRepository = require("../repositories/adoption.repository");
const userRepository = require("../repositories/user.repository");
const petRepository = require("../repositories/pet.repository");

class AdoptionsService {
  async getAll() {
    return adoptionRepository.getAllPopulated();
  }

  async getById(id) {
    return adoptionRepository.getByIdPopulated(id);
  }

  async create({ owner, pet }) {
    const userExists = await userRepository.getById(owner);
    if (!userExists) throw new Error("OWNER_NOT_FOUND");

    const petExists = await petRepository.getById(pet);
    if (!petExists) throw new Error("PET_NOT_FOUND");

    return adoptionRepository.create({ owner, pet });
  }

  async cancel(id) {
    const updated = await adoptionRepository.updateById(id, { status: "cancelled" });
    if (!updated) throw new Error("ADOPTION_NOT_FOUND");
    return updated;
  }
}

module.exports = new AdoptionsService();