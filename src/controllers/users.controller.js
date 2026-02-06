const usersService = require("../services/users.service");

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { getUsers };