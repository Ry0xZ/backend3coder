const userRepository = require("../repositories/user.repository");

class UsersService {
  async getAll() {
    return userRepository.getAll();
  }

  async insertMany(users) {
    if (!Array.isArray(users) || users.length === 0) return [];
    return userRepository.insertMany(users);
  }
}

module.exports = new UsersService();