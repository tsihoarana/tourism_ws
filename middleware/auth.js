const jwt = require("jsonwebtoken");
const config = require("config");
const CustomResponse = require("../models/customResponse");

module.exports = function(req, res, next) {
  // if (!config.get("requiresAuth")) return next();
  let customResponse = {};

  let token = req.header("authorization");
  if (!token) {
    customResponse = new CustomResponse(401, 'Access denied. No token provided.');
    return res.send(customResponse);
  }
  if (token.startsWith("Bearer ")){
    token = token.substring(7, token.length);
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    customResponse = new CustomResponse(400, 'Invalid token.');
    res.send(customResponse);
  }
};
