'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const moment = require('moment');

require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const usersRouter = require('./routes/users');
const requestsRouter = require('./routes/requests');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: process.env.SECRET_STRING,
  resave: true,
  httpOnly: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('dateFormat', date => {
  const newDate = date.toString();
  return moment(newDate).format('MMM Do YY');
});
hbs.registerHelper('fromTo', userType => {
  if (userType === app.locals.currentUser.userType) {
    return true;
  } else {
    return false;
  }
});
hbs.registerHelper('bandLike', userType => {
  if (userType !== app.locals.currentUser.userType && app.locals.currentUser.userType === 'stage') {
    return true;
  } else {
    return false;
  }
});
hbs.registerHelper('statusFilter', status => {
  if (status === 'accepted') {
    return true;
  } else {
    return false;
  }
});
hbs.registerHelper('containsMessage', message => {
  if (message.trim() !== '') {
    return true;
  } else {
    return false;
  }
});
hbs.registerHelper('bandLikeState', userType => {
  if (userType === 'band') {
    return true;
  } else {
    return false;
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/requests', requestsRouter);

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
