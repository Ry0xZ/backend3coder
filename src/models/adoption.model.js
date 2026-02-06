const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    status: { type: String, default: "active", enum: ["active", "cancelled"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoptions", adoptionSchema);