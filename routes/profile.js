'use strict';

const express = require('express');
const router = express.Router();
const parser = require('../config/cloudinary');
const bcrypt = require('bcrypt');

const Band = require('../models/Band');
const Stage = require('../models/Stage');
const genreList = require('../helpers/genres');

const saltRounds = 10;

const { signinRequired, bothPasswordField, differentPasswordField } = require('../middlewares/authMiddlewares');

router.get('/', signinRequired, (req, res, next) => {
  const hasAddress =
    req.session.currentUser.userType === 'stage' ? 'Has address' : null;
  res.render('profile', { hasAddress });
});

router.get('/edit', signinRequired, (req, res, next) => {
  const data = {
    password: req.flash('passwordFormNotFilled'),
    differentPasswords: req.flash('differentPasswords')
  };
  const hasAddress =
  req.session.currentUser.userType === 'stage' ? 'Has address' : null;
  res.render('editProfile', { genreList, hasAddress, data });
});

router.post('/edit', parser.single('edit-photo'), signinRequired, bothPasswordField, differentPasswordField, async (req, res, next) => {
  try {
    const { name, tagLine, location, description, genres, address, password, rePassword, genreList } = req.body;
    const genre = genreList.split('-');
    genre.splice(0, 1);
    const profilePicture = req.file
      ? req.file.secure_url
      : req.session.currentUser.profilePicture;
    const user = req.session.currentUser;
    const type = user.userType === 'band' ? Band : Stage;
    const locationLower = location.toLowerCase();
    let newUser = null;
    if (password === '' && rePassword === '') {
      newUser = await type.findByIdAndUpdate(
        user._id,
        { $set: { name, tagLine, location: locationLower, description, genres, profilePicture, address, genre } },
        { new: true }
      );
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      newUser = await type.findByIdAndUpdate(
        user._id,
        { $set: { name, tagLine, location: locationLower, description, genres, profilePicture, address, password: hashedPassword, genre } },
        { new: true }
      );
    }
    req.session.currentUser = newUser;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
