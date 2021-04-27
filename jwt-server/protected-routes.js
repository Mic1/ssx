const express = require('express'),
      jwt     = require('express-jwt'),
      config  = require('./config');

const app = module.exports = express.Router();

const jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected', (req, res) => {
  return res.status(200).end();
});