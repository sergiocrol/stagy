const express = require('express');
const router = express.Router();

const { signinRequired } = require('../middlewares/authMiddlewares');

router.get('/', signinRequired, (req, res, next) => {
  console.log(req.session.currentUser);
  res.render('profile');
});

module.exports = router;
