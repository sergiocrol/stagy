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
  let errors = false;
  if (!name.trim()) { req.flash('nameFormNotFilled', 'Name is required'); errors = true; } else { req.flash('errorName', name); }
  if (!password.trim()) { req.flash('passwordFormNotFilled', 'Password is required'); errors = true; } else { req.flash('errorPassword', password); }
  if (!email.trim()) { req.flash('emailFormNotFilled', 'Email is required'); errors = true; } else { req.flash('errorEmail', email); }
  if (!location.trim()) { req.flash('locationFormNotFilled', 'Location is required'); errors = true; } else { req.flash('errorLocation', location); }
  if (errors) { return res.redirect(req.originalUrl); }
  next();
};

const isLoginFormFilled = (req, res, next) => {
  const { email, password } = req.body;
  let errors = false;
  if (!password.trim()) { req.flash('passwordFormNotFilled', 'Password is required'); errors = true; } else { req.flash('errorPassword', password); }
  if (!email.trim()) { req.flash('emailFormNotFilled', 'Email is required'); errors = true; } else { req.flash('errorEmail', email); }
  if (errors) { return res.redirect(req.originalUrl); }
  next();
};

const signinRequired = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(String(email).toLowerCase())) {
    req.flash('wrongEmailFormat', 'Invalid email');
    return res.redirect(req.originalUrl);
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const re = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  console.log(re.test(password));
  if (!re.test(password)) {
    req.flash('wrongPasswordFormat', 'Password must contain 6 characters. At least 1 uppercase, 1 number and 1 special character');
    return res.redirect(req.originalUrl);
  }
  next();
};

const bothPasswordField = (req, res, next) => {
  const { password, rePassword } = req.body;
  if ((password && !rePassword) || (!password && rePassword)) {
    req.flash('passwordFormNotFilled', 'Both fields are required');
    return res.redirect(req.originalUrl);
  }
  next();
};

const differentPasswordField = (req, res, next) => {
  const { password, rePassword } = req.body;
  if (password.trim() !== rePassword.trim()) {
    req.flash('differentPasswords', 'The passwords are not the same');
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isSignupFormFilled,
  isLoginFormFilled,
  signinRequired,
  isValidEmail,
  isValidPassword,
  bothPasswordField,
  differentPasswordField
};
