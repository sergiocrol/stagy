const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/home');
  } else {
    res.render('index', { title: 'Express' });
  }
});

router.get('/home', isNotLoggedIn, (req, res, next) => {
  res.render('home', { title: 'Home Page' });
});

module.exports = router;
