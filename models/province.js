const mongoose = require("mongoose");
const config = require("config");

const provinceSchema = new mongoose.Schema({
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
  pdp: {
    type: String
  },
  pdc: {
    type: String
  },
  liens: [String],
  images: [String],
  videos: [String]
});

provinceSchema.statics.get = async function (query) {
  let lieus = await this.find(query).lean().exec();
  
  return lieus.map(obj => ({ ...obj, 
                    pdp: config.get("media_url") + obj.pdp,
                    pdc: config.get("media_url") + obj.pdc,
                    videos: obj.videos.map(item => config.get("media_url") + item)
  }));
};

provinceSchema.statics.getOne = async function (query) {
  let province = await this.findOne(query).lean().exec();

  return { ...province, 
              pdp: config.get("media_url") + province.pdp,
              pdc: config.get("media_url") + province.pdc,
              videos:province.videos.map(item => config.get("media_url") + item) 
  };
};

const Province = mongoose.model("Province", provinceSchema);

exports.Province = Province;
exports.provinceSchema = provinceSchema;