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

module.exports = router;
