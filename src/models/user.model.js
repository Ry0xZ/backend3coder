const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hash
    role: { type: String, enum: ["user", "admin"], required: true },
    pets: { type: Array, default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);