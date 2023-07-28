const mongoose = require("mongoose");

const lieuSchema = new mongoose.Schema({
  idprovince: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  nom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 512
  },
  images: [String]
});

const Lieu = mongoose.model("Lieu", lieuSchema);

exports.Lieu = Lieu;
exports.lieuSchema = lieuSchema;