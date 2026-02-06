const BaseRepository = require("./base.repository");
const Adoption = require("../models/adoption.model");

class AdoptionRepository extends BaseRepository {
  constructor() {
    super(Adoption);
  }

  async getAllPopulated() {
    return this.model.find().populate("owner").populate("pet").lean();
  }

  async getByIdPopulated(id) {
    return this.model.findById(id).populate("owner").populate("pet").lean();
  }
}

module.exports = new AdoptionRepository();