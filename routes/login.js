const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.model');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {

  await User.findOne({ email: req.body.username }, (err, user) => {
    if (!err && user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!err && result) {
          res.render('secrets', { secret: user.password });
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;