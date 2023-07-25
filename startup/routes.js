const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const provinces = require('../routes/provinces');
const public = require('../routes/public');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/provinces', provinces);
  app.use('/api/public', public);
  app.use(error);
}