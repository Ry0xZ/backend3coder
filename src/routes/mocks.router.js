const { Router } = require("express");
const { getMockingPets, getMockingUsers, postGenerateData } = require("../controllers/mocks.controller");

const router = Router();

// Endpoint “/mockingpets” dentro del router /api/mocks ✅
router.get("/mockingpets", getMockingPets);

// Endpoint GET “/mockingusers” genera 50 ✅
router.get("/mockingusers", getMockingUsers);

// Endpoint POST “/generateData” inserta en Mongo ✅
router.post("/generateData", postGenerateData);

module.exports = router;