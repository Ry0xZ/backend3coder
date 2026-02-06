const { Router } = require("express");
const { getPets } = require("../controllers/pets.controller");

const router = Router();

router.get("/", getPets);

module.exports = router;