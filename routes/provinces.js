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
  const provinces = await Province.get();

  const customResponse = new CustomResponse(200, '', provinces);
  res.send(customResponse);
});

/*
  return one province
*/
router.get("/:id", auth, async (req, res) => {
  const province = await Province.getOne({ _id: req.params.id });

  const customResponse = new CustomResponse(200, '', province);
  res.send(customResponse);
});

module.exports = router;
