const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const _ = require("lodash");
const { Lieu } = require("../models/lieu");
const CustomResponse = require("../models/customResponse");
const express = require("express");
const router = express.Router();

/*
  return all lieu
*/
router.get("/", auth, async (req, res) => {
  const lieus = await Lieu.find();

  const customResponse = new CustomResponse(200, '', lieus);
  res.send(customResponse);
});

/*
  return a list of lieu by idProvince
*/
router.get("/:idProvince", auth, async (req, res) => {
    const lieus = await Lieu.find({ idProvince: req.params.idProvince });
  
    const customResponse = new CustomResponse(200, '', lieus);
    res.send(customResponse);
});

module.exports = router;
