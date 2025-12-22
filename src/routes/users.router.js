const { Router } = require("express");
const User = require("../models/user.model");

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find().lean();
  res.json({ status: "success", payload: users });
});

module.exports = router;