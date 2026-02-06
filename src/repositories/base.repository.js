class BaseRepository {
  constructor(model) {
    if (!model) throw new Error("BaseRepository requiere un modelo");
    this.model = model;
  }

  async getAll(filter = {}, { lean = true } = {}) {
    const query = this.model.find(filter);
    return lean ? query.lean() : query;
  }

  async getById(id, { lean = true } = {}) {
    const query = this.model.findById(id);
    return lean ? query.lean() : query;
  }

  async create(data) {
    return this.model.create(data);
  }

  async insertMany(docs, options = {}) {
    return this.model.insertMany(docs, { ordered: false, ...options });
  }

  async updateById(
    id,
    update,
    { newDoc = true, runValidators = true, lean = true } = {}
  ) {
    const query = this.model.findByIdAndUpdate(id, update, {
      new: newDoc,
      runValidators,
    });
    return lean ? query.lean() : query;
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;