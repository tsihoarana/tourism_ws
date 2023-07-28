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

provinceSchema.statics.get = async function (query) {
  let lieus = await this.find(query).lean().exec();
  
  return lieus.map(obj => ({ ...obj, 
                    pdp: config.get("media_url") + obj.pdp,
                    pdc: config.get("media_url") + obj.pdc
                  }));
};

const Province = mongoose.model("Province", provinceSchema);

exports.Province = Province;
exports.provinceSchema = provinceSchema;