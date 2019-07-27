'use strict';

const mongoose = require('mongoose');

const Stage = require('../models/Stage');

mongoose.connect('mongodb://localhost/stagy', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const stages = [
  {
    name: '',
    email: '',
    password: '',
    location: '',
    genre: '',
    address: '',
    rating: 0,
    reviewers: 0,
    description: '',
    tagLine: '',
    profilePicture: ''
  }
];

const insertSeed = async () => {
  try {
    await Stage.insertMany(stages);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

insertSeed();
