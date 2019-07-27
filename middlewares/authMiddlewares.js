'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isSignupFormFilled = (req, res, next) => {
  const { email, password, name, location } = req.body;
  if (!name || !password || !email || !location) {
    req.flash('errorFormNotFilled', 'All fields are required');
    return res.redirect(req.originalUrl);
  }
  next();
};

const isLoginFormFilled = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    req.flash('errorFormNotFilled', 'All fields are required');
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isSignupFormFilled,
  isLoginFormFilled
};
