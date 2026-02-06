const { Router } = require("express");
const {
  getAdoptions,
  getAdoptionById,
  createAdoption,
  cancelAdoption,
} = require("../controllers/adoptions.controller");

const router = Router();

router.get("/", getAdoptions);
router.get("/:aid", getAdoptionById);
router.post("/", createAdoption);
router.put("/:aid/cancel", cancelAdoption);

module.exports = router;