const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const _ = require("lodash");
const { DetailProvince } = require("../models/detailProvince");
const CustomResponse = require("../models/customResponse");
const express = require("express");
const router = express.Router();

/*
  return a detailprovince
*/
router.get("/:idProvince", auth, async (req, res) => {
  let customResponse = {};

  const detailProvinces = await DetailProvince.getOne({"idProvince": req.params.id});
  if (!detailProvinces) {
    customResponse = new CustomResponse(404, 'province non trouver');
    return res.send(customResponse);
  }

  customResponse = new CustomResponse(200, '', detailProvinces);
  res.send(customResponse);
});

module.exports = router;
