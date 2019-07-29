'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Band = require('../models/Band');
const Stage = require('../models/Stage');
const { isLoggedIn, isNotLoggedIn, isSignupFormFilled, isLoginFormFilled, isValidEmail, isValidPassword } = require('../middlewares/authMiddlewares');

const saltRounds = 10;

router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    name: req.flash('nameFormNotFilled'),
    password: req.flash('passwordFormNotFilled'),
    email: req.flash('emailFormNotFilled'),
    location: req.flash('locationFormNotFilled'),
    nameFilled: req.flash('errorName'),
    passwordFilled: req.flash('errorPassword'),
    emailFilled: req.flash('errorEmail'),
    locationFilled: req.flash('errorLocation'),
    validEmail: req.flash('wrongEmailFormat'),
    validPassword: req.flash('wrongPasswordFormat'),
    emailExist: req.flash('emailExist')
  };
  res.render('signup', data);
});

router.post('/signup', isLoggedIn, isSignupFormFilled, isValidEmail, isValidPassword, async (req, res, next) => {
  const { email, password, location, name, userType } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const locationLower = location.toLowerCase();
  try {
    const { user, model } = (userType === 'stage')
      ? { user: await Stage.findOne({ email }), model: Stage }
      : { user: await Band.findOne({ email }), model: Band };
    if (!user) {
      const newUser = await model.create({
        email, password: hashedPassword, location: locationLower, name, userType
      });
      req.session.currentUser = newUser;
      res.redirect(req.originalUrl);
    } else {
      req.flash('emailExist', 'This email already exist');
      res.redirect(req.originalUrl);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/login', isLoggedIn, (req, res, next) => {
  const data = {
    password: req.flash('passwordFormNotFilled'),
    email: req.flash('emailFormNotFilled'),
    passwordFilled: req.flash('errorPassword'),
    emailFilled: req.flash('errorEmail'),
    validEmail: req.flash('wrongEmailFormat'),
    invalidMailPassword: req.flash('invalidMailPassword'),
    notUser: req.flash('notUser')
  };
  res.render('login', data);
});

router.post('/login', isLoggedIn, isLoginFormFilled, isValidEmail, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = [await Band.findOne({ email })];
    user.push(await Stage.findOne({ email }));
    user = user.filter(Boolean);
    if (user[0]) {
      if (bcrypt.compareSync(password, user[0].password)) {
        req.session.currentUser = user[0];
        res.redirect('/');
      } else {
        req.flash('invalidMailPassword', 'Invalid password');
        res.redirect(req.originalUrl);
      }
    } else {
      req.flash('notUser', 'This email is not registered');
      res.redirect(req.originalUrl);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
