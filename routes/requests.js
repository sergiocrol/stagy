const express = require('express');
const router = express.Router();

// const Band = require('../models/Band');
// const Stage = require('../models/Stage');

router.get('/', async (req, res, next) => {
  res.render('requests');
});

router.post('/', async (req, res, next) => {
  const query = req.query;
  const body = req.body;
  console.log('!!! query:', query);
  console.log('!!! body:', body);
  res.render('requests');
});

module.exports = router;
