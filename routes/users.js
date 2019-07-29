const express = require('express');
const router = express.Router();

const Band = require('../models/Band');
const Stage = require('../models/Stage');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { genre, location } = req.query;
  const model = req.session.currentUser.userType === 'band' ? Stage : Band;
  const locationLower = location.toLowerCase();
  const users = await model.find({ genre, location: locationLower });
  res.render('search-result', { title: 'Search results' });
});

module.exports = router;
