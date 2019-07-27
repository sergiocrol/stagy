'use strict';

const mongoose = require('mongoose');

const Band = require('../models/Band');

mongoose.connect('mongodb://localhost/stagy', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const bands = [
  {
    name: '',
    email: '',
    password: '',
    location: '',
    genre: '',
    otherLocations: [],
    rating: 0,
    reviewers: 0,
    description: '',
    tagLine: '',
    profilePicture: ''
  }
];

const insertSeed = async () => {
  try {
    await Band.insertMany(bands);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

insertSeed();
