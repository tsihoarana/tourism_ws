const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateUpdate } = require("../models/user");
const CustomResponse = require("../models/customResponse");
const express = require("express");
const router = express.Router();

/*
  display infos of authenticated user
*/
router.get("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id).select("-password");
  user = _.pick(user, ["_id", "nom", "prenom", "email"]);

  const customResponse = new CustomResponse(200, '', user);
  res.send(customResponse);
});

/*
  register 
*/
router.post("/", async (req, res) => {
  let customResponse = {};

  const { error } = validate(req.body);
  if (error) {
    customResponse = new CustomResponse(400, error.details[0].message);
    return res.send(customResponse);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    customResponse = new CustomResponse(400, 'utilisateur déja enregistrer.');
    return res.send(customResponse);
  }

  user = new User(_.pick(req.body, ["nom", "prenom", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.code_type = 0;
  await user.save();

  const token = user.generateAuthToken();
  user = _.pick(user, ["_id", "nom", "prenom", "email"]);

  customResponse = new CustomResponse(200, 'Inscription réussi', {token, user});
  res.send(customResponse);
});

/* 
  update infos of authenticated user
*/
router.put("/update", auth, async (req, res) => {
  let customResponse = {};
  
  const { error } = validateUpdate(req.body);
  if (error) {
    customResponse = new CustomResponse(400, error.details[0].message);
    return res.send(customResponse);
  }

  let user = await User.findById(req.user._id);
  user.setNom(req.body.nom);
  user.setPrenom(req.body.prenom);
  user.setEmail(req.body.email);
  await user.setPassword(req.body.password);
  await user.save();

  user = _.pick(user, ["_id", "nom", "prenom", "email"]);
  customResponse = new CustomResponse(200, 'Modification de vos informations réussi', user);
  res.send(customResponse);
});

module.exports = router;
