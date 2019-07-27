'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Band = require('../models/Band');
const Stage = require('../models/Stage');
const { isLoggedIn, isNotLoggedIn, isSignupFormFilled, isLoginFormFilled } = require('../middlewares/authMiddlewares');

const saltRounds = 10;

router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled')
  };
  res.render('signup', data);
});

router.post('/signup', isLoggedIn, isSignupFormFilled, async (req, res, next) => {
  const { email, password, location, name, userType } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const { user, model } = (userType === 'stage')
      ? { user: await Stage.findOne({ email }), model: Stage }
      : { user: await Band.findOne({ email }), model: Band };
    if (!user) {
      const newUser = await model.create({
        email, password: hashedPassword, location, name, userType
      });
      req.session.currentUser = newUser;
      res.redirect(req.originalUrl);
    } else {
      console.log('This user already exists');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/login', isLoggedIn, (req, res, next) => {
  res.render('login');
});

router.post('/login', isLoggedIn, isLoginFormFilled, async (req, res, next) => {
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
        req.flash('invalidMailPassword', 'Invalid email or password');
        console.log('Invalid email or password');
      }
    } else {
      req.flash('notUser', 'doesnt exists this user in the DB');
      console.log('doesnt exists this user in the DB');
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
