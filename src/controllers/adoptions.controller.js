const adoptionsService = require("../services/adoptions.service");

const getAdoptions = async (req, res) => {
  try {
    const data = await adoptionsService.getAll();
    res.json({ status: "success", payload: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getAdoptionById = async (req, res) => {
  try {
    const { aid } = req.params;
    const data = await adoptionsService.getById(aid);
    if (!data) return res.status(404).json({ status: "error", message: "NOT_FOUND" });
    res.json({ status: "success", payload: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { owner, pet } = req.body;
    if (!owner || !pet) {
      return res.status(400).json({ status: "error", message: "owner y pet son requeridos" });
    }

    const created = await adoptionsService.create({ owner, pet });
    res.status(201).json({ status: "success", payload: created });
  } catch (error) {
    if (error.message === "OWNER_NOT_FOUND") {
      return res.status(404).json({ status: "error", message: "OWNER_NOT_FOUND" });
    }
    if (error.message === "PET_NOT_FOUND") {
      return res.status(404).json({ status: "error", message: "PET_NOT_FOUND" });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
};

const cancelAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const updated = await adoptionsService.cancel(aid);
    res.json({ status: "success", payload: updated });
  } catch (error) {
    if (error.message === "ADOPTION_NOT_FOUND") {
      return res.status(404).json({ status: "error", message: "NOT_FOUND" });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { getAdoptions, getAdoptionById, createAdoption, cancelAdoption };