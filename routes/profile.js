const express = require('express');
const router = express.Router();
const parser = require('../config/cloudinary');

const Band = require('../models/Band');
const Stage = require('../models/Stage');

const { signinRequired } = require('../middlewares/authMiddlewares');

router.get('/', signinRequired, (req, res, next) => {
  console.log(req.session.currentUser);
  res.render('profile');
});

router.get('/edit', signinRequired, (req, res, next) => {
  res.render('editProfile');
});

router.post('/edit', parser.single('photo'), signinRequired, async (req, res, next) => {
  try {
    const { name } = req.body;
    const profilePicture = req.file.secure_url;
    const user = req.session.currentUser;
    const type = user.userType === 'band' ? Band : Stage;
    const newUser = await type.findByIdAndUpdate(user._id, { $set: { name, profilePicture } }, { new: true });
    req.session.currentUser = newUser;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
