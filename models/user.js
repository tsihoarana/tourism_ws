const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  prenom: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email
    },
    config.get("jwtPrivateKey"),
    { expiresIn: '7d' }
  );
  return token;
};

userSchema.methods.setNom = function(nom) {
  if (nom)
    this.nom = nom;
}

userSchema.methods.setPrenom = function(prenom) {
  if (prenom)
    this.prenom = prenom;
}

userSchema.methods.setEmail = function(email) {
  if (email)
    this.email = email;
}

userSchema.methods.setPassword = async function(password) {
  if (password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt)
  }
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    nom: Joi.string()
      .min(2)
      .max(50)
      .required()
      .options({
        language: {
          any: { required: 'est requis' },
          string: { min: 'doit être 3 Characteres minimum' , max: 'doit etre 50 Characteres maximum'},
        },
      }),
    prenom: Joi.string()
      .min(2)
      .max(50)
      .options({
        language: {
          string: { min: 'doit être 3 Characteres minimum' , max: 'doit etre 50 Characteres maximum'},
        },
      }),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label('mot de passe')
      .options({
        language: {
          any: { required: 'est requis' },
          string: { min: 'doit être 5 Characteres minimum' , max: 'doit etre 255 Characteres maximum'},
        },
      })
  };

  return Joi.validate(user, schema);
}

function validateUpdateUser(user) {
  const schema = {
    nom: Joi.string()
      .min(2)
      .max(50)
      .options({
        language: {
          string: { min: 'doit être 3 Characteres minimum' , max: 'doit etre 50 Characteres maximum'},
        },
      }),
    prenom: Joi.string()
      .min(2)
      .max(50)
      .options({
        language: {
          string: { min: 'doit être 3 Characteres minimum' , max: 'doit etre 50 Characteres maximum'},
        },
      }),
    email: Joi.string()
      .min(5)
      .max(255)
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .label('mot de passe')
      .options({
        language: {
          string: { min: 'doit être 5 Characteres minimum' , max: 'doit etre 255 Characteres maximum'},
        },
      })
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateUpdate = validateUpdateUser;
exports.userSchema = userSchema;