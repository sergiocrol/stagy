'use strict';

const express = require('express');
const router = express.Router();

const Band = require('../models/Band');
const Stage = require('../models/Stage');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { genre, location } = req.query;
  const model = req.session.currentUser.userType === 'band' ? Stage : Band;
  const locationTrim = location.trim();
  const users = (locationTrim !== '') ? await model.find({ genre, location: { $regex: locationTrim, $options: 'i' } }) : await model.find({ genre });
  res.render('search-result', { title: 'Search results', users });
});

router.get('/type/:type', async (req, res, next) => {
  const { genre, location } = req.query;
  const type = req.params.type;
  const locationTrim = location.trim();
  const users = (type === 'band') ? await Band.find({ genre, location: { $regex: locationTrim, $options: 'i' } }) : await Stage.find({ genre, location: { $regex: locationTrim, $options: 'i' } }); ;
  res.render('search-result', { title: 'Search results', users });
});

router.get('/:id', async (req, res, next) => {
  const type = req.query.type === 'band' ? Band : Stage;
  const { id } = req.params;
  const allowRequest = req.query.type === 'band' ? 'Allow Requests' : '';
  console.log(req.query.type, allowRequest);
  try {
    const user = await type.findById(id);
    res.render('user', { user, allowRequest });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
