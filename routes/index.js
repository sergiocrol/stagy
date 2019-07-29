const express = require('express');
const router = express.Router();

const genreList = require('../helpers/genres');
const Band = require('../models/Band');
const Stage = require('../models/Stage');

/*

TODO:
  - Revisar historial de navegación para el back-button
  - Cómo conseguir el nombre de la colección de un documento

FIXME:

*/
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/home');
  } else {
    res.render('index', { title: 'Express' });
  }
});

router.get('/home', async (req, res, next) => {
  const user = req.session.currentUser;
  let data = { title: 'welcome', genreList };
  if (user) {
    data = { title: user.userType, genreList };
    console.log(user.userType);
    const model = user.userType === 'band' ? Stage : Band;
    data.searchResult = await model.find({});
  } else {
    data.searchResult = await Band.find({});
  }
  res.render('home', data);
});

module.exports = router;
