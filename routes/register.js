const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user.model');

const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('register', { info: "" });
});

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds).then(async (hash) => {
    const user = new User({
      email: req.body.username,
      password: hash
    });

    await User.countDocuments({ email: req.body.username }, (err, result) => {
      if (!err && result === 0) {
        user.validate({}, (err) => {
          if (!err) {
            user.save((err) => {
              if (!err) {
                res.render('secrets', { secret: hash });
              } else {
                next(err);
              }
            });
          } else {
            next(err);
          }
        });
      } else {
        res.render('register', { info: 'Usuário já existe!' });
      }
    });
  });
});

module.exports = router;