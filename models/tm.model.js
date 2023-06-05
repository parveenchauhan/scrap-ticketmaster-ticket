const mongoose = require("mongoose");

const TMSchema = new mongoose.Schema({
  data: String,
});
module.exports = mongoose.model("tm_data", TMSchema);
