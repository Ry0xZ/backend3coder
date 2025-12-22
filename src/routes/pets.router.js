const { Router } = require("express");
const Pet = require("../models/pet.model");

const router = Router();

router.get("/", async (req, res) => {
  const pets = await Pet.find().lean();
  res.json({ status: "success", payload: pets });
});

module.exports = router;