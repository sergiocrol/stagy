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
  res.render('search-result', { title: 'Search results', users });
});

router.get('/type/:type', async (req, res, next) => {
  const { genre, location } = req.query;
  const locationLower = location.toLowerCase();
  const type = req.params.type;
  const users = (type === 'band') ? await Band.find({ genre, location: locationLower }) : await Stage.find({ genre, location: locationLower }); ;
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
