const express = require('express');
const router = express.Router();

const Band = require('../models/Band');
const Stage = require('../models/Stage');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect('/');
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
