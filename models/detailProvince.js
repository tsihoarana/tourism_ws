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

provinceSchema.statics.getAll = async function () {
  let provinces = await this.find().lean().exec();
  return provinces.map(obj => ({ ...obj, videos: obj.videos.map(item => config.get("media_url") + item) }));
};

provinceSchema.statics.getOne = async function (query) {
  let province = await this.findOne(query).lean().exec();
  province = { ...province, videos:province.videos.map(item => config.get("media_url") + item) };
  return province;
};

const DetailProvince = mongoose.model("DetailProvince", provinceSchema);

exports.DetailProvince = DetailProvince;
exports.provinceSchema = provinceSchema;