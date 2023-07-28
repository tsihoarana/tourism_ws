const mongoose = require("mongoose");
const config = require("config");

const provinceSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64
  },
  pdp: {
    type: String
  },
  pdc: {
    type: String
  }
});

const Province = mongoose.model("Province", provinceSchema);

exports.Province = Province;
exports.provinceSchema = provinceSchema;