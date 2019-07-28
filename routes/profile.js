const express = require('express');
const router = express.Router();
const parser = require('../config/cloudinary');

const Band = require('../models/Band');
const Stage = require('../models/Stage');
const genreList = require('../helpers/genres');

const { signinRequired } = require('../middlewares/authMiddlewares');

router.get('/', signinRequired, (req, res, next) => {
  const hasAddress =
    req.session.currentUser.userType === 'stage' ? 'Has address' : null;
  res.render('profile', { hasAddress });
});

router.get('/edit', signinRequired, (req, res, next) => {
  res.render('editProfile', { genreList });
});

router.post(
  '/edit',
  parser.single('photo'),
  signinRequired,
  async (req, res, next) => {
    try {
      const {
        name,
        tagline,
        location,
        description,
        address,
        genres
      } = req.body;
      console.log('Body', req.body);
      const profilePicture = req.file
        ? req.file.secure_url
        : req.session.currentUser.profilePicture;
      const user = req.session.currentUser;
      const type = user.userType === 'band' ? Band : Stage;
      const newUser = await type.findByIdAndUpdate(
        user._id,
        { $set: { name, profilePicture } },
        { new: true }
      );
      req.session.currentUser = newUser;
      res.redirect('/profile');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
