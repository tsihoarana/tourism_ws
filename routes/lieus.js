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
  const search_key = req.query.search
  const search_query = search_key ? {nom: { $regex: '.*' + search_key + '.*', $options: 'i'} } : {};
  console.log(search_query);
  const lieus = await Lieu.get(search_query);

  const customResponse = new CustomResponse(200, '', lieus);
  res.send(customResponse);
});

/*
  return a list of lieu by idProvince
*/
router.get("/:idprovince", auth, async (req, res) => {
    const lieus = await Lieu.getOne({ idprovince: req.params.idprovince });
  
    const customResponse = new CustomResponse(200, '', lieus);
    res.send(customResponse);
});

module.exports = router;
