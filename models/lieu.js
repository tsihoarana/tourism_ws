const mongoose = require("mongoose");
const config = require("config");

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
  pdp: { type: String },
  pdc: { type: String },
  images: [String]
});

lieuSchema.statics.get = async function (query) {
  let lieus = await this.find(query).lean().exec();
  
  return lieus.map(obj => ({ ...obj, 
                    pdp: config.get("media_url") + obj.pdp,
                    pdc: config.get("media_url") + obj.pdc
                  }));
};

lieuSchema.statics.getOne = async function (query) {
  let lieu = await this.findOne(query).lean().exec();
  
  return { ...lieu, 
                    pdp: config.get("media_url") + lieu.pdp,
                    pdc: config.get("media_url") + lieu.pdc
                  };
};

const Lieu = mongoose.model("Lieu", lieuSchema);

exports.Lieu = Lieu;
exports.lieuSchema = lieuSchema;