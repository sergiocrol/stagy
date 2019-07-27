'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Band = require('../models/Band');
const Stage = require('../models/Stage');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const { email, password, location, name, userType } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const { user, model } = (userType === 'stage')
      ? { user: await Stage.findOne({ email }), model: Stage }
      : { user: await Band.findOne({ email }), model: Band };
    if (!user) {
      const newUser = await model.create({
        email, password: hashedPassword, location, name
      });
      req.session.currentUser = newUser;
    } else {
      console.log('This user already exists');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/login', (req, res, next) => {

});

router.post('/login', async (req, res, next) => {

});

router.post('/logout', (req, res, next) => {

});

module.exports = router;
