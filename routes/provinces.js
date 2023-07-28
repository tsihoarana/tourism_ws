const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const _ = require("lodash");
const { Province } = require("../models/province");
const CustomResponse = require("../models/customResponse");
const express = require("express");
const router = express.Router();

/*
  return a list of province
*/
router.get("/", auth, async (req, res) => {
  console.log("lolllll");
  const provinces = await Province.get();

  const customResponse = new CustomResponse(200, '', provinces);
  res.send(customResponse);
});

module.exports = router;
