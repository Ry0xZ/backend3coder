const { Router } = require("express");
const { getMockingPets, getMockingUsers, postGenerateData } = require("../controllers/mocks.controller");

const router = Router();

router.get("/mockingpets", getMockingPets);

router.get("/mockingusers", getMockingUsers);

router.post("/generateData", postGenerateData);

module.exports = router;