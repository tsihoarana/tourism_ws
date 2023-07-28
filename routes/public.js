const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const _ = require("lodash");
const CustomResponse = require("../models/customResponse");
const express = require("express");
const router = express.Router();

/*
  allow requests to public/videos/{file}
*/
router.use("/videos",  express.static("public/videos"));

/*
  allow requests to public/images/{province_folder}/{file}
*/
router.use("/images/antananarivo",  express.static("public/images/antananarivo"));
router.use("/images/antsiranana",  express.static("public/images/antsiranana"));
router.use("/images/toamasina",  express.static("public/images/toamasina"));

module.exports = router;
