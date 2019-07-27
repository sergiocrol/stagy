const express = require('express');
const router = express.Router();

/*

TODO:
  - Revisar historial de navegación para el back-button

FIXME:

*/
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/home');
  } else {
    res.render('index', { title: 'Express' });
  }
});

router.get('/home', (req, res, next) => {
  res.render('home', { title: 'Home Page' });
});

module.exports = router;
