'use strict';

const express = require('express');
const router = express.Router();

const Band = require('../models/Band');
const Stage = require('../models/Stage');
const { signinRequired } = require('../middlewares/authMiddlewares');

/* GET users listing. */
router.get('/', signinRequired, async (req, res, next) => {
  const { genre, location } = req.query;
  if (location === undefined || genre === undefined) { res.redirect('/auth/login'); };
  const model = req.session.currentUser.userType === 'band' ? Stage : Band;
  const locationTrim = location.trim();
  const users = (locationTrim !== '') ? await model.find({ genre, location: { $regex: locationTrim, $options: 'i' } }) : await model.find({ genre });
  res.render('search-result', { title: 'Search results', users });
});

router.get('/type/:type', async (req, res, next) => {
  const { genre, location } = req.query;
  if (location === undefined || genre === undefined) { res.redirect('/auth/login'); };
  const type = req.params.type;
  const locationTrim = location.trim();
  const users = (type === 'band') ? await Band.find({ genre, location: { $regex: locationTrim, $options: 'i' } }) : await Stage.find({ genre, location: { $regex: locationTrim, $options: 'i' } }); ;
  res.render('search-result', { title: 'Search results', users });
});

router.get('/:id', async (req, res, next) => {
  if (req.query.type === undefined) { res.redirect('/auth/login'); };
  const type = req.query.type === 'band' ? Band : Stage;
  const { id } = req.params;
  const allowRequest = req.query.type === 'band' ? 'Allow Requests' : '';
  console.log(req.query.type, allowRequest);
  try {
    const user = await type.findById(id);
    res.render('user', { user, allowRequest });
  } catch (error) {
    res.redirect('/auth/login');
    // next(error);
  }
});

module.exports = router;
