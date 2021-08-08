const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.model');


router.get('/', (req, res) => {
  res.render('login', { info: "" });
});

router.post('/', async (req, res) => {

  await User.findOne({ email: req.body.username }, (err, user) => {
    if (!err && user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!err && result) {
          res.render('secrets', { secret: user.password });
        } else {
          res.render('login', { info: "Email ou senha inválidos!" });
        }
      });
    } else {
      res.render('login', { info: "Email ou senha inválidos!" });
    }
  });
});

module.exports = router;