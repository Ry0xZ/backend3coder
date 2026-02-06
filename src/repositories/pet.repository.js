const BaseRepository = require("./base.repository");
const Pet = require("../models/pet.model");

class PetRepository extends BaseRepository {
  constructor() {
    super(Pet);
  }
}

module.exports = new PetRepository();