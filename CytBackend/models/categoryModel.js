const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }  // `name` es requerido y único
});

module.exports = mongoose.model("Category", categorySchema);
