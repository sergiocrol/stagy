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
    name: 'Aerosmith',
    email: 'aerosmith@mail.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Barcelona',
    genre: 'Rock',
    otherLocations: [],
    rating: 0,
    reviewers: 0,
    description: 'American rock band formed in Boston',
    tagLine: 'We are Aerosmith!',
    profilePicture: '',
    userType: 'band'
  },
  {
    name: 'The Rolling Stones',
    email: 'rollingstones@mail.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Bilbao',
    genre: 'Rock',
    otherLocations: [],
    rating: 0,
    reviewers: 0,
    description:
      'The Rolling Stones are an English rock band formed in London in 1962. The first stable line-up consisted of bandleader Brian Jones (guitar, harmonica, keyboards), Mick Jagger (lead vocals, harmonica), Keith Richards (guitar, vocals), Bill Wyman (bass), Charlie Watts (drums), and Ian Stewart (piano)',
    tagLine: 'We are The Rolling Stones!',
    profilePicture: '',
    userType: 'band'
  },
  {
    name: 'Grupo Niche',
    email: 'gruponiche@mail.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Barcelona',
    genre: 'Salsa',
    otherLocations: [],
    rating: 0,
    reviewers: 0,
    description:
      'Grupo Niche is a salsa group founded in 1978 in Cali, Colombia. Currently based in Cali, Colombia',
    tagLine: 'We are Grupo Niche!',
    profilePicture: '',
    userType: 'band'
  },
  {
    name: 'Grupo Galé',
    email: 'grupogale@mail.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Bilbao',
    genre: 'Salsa',
    otherLocations: [],
    rating: 0,
    reviewers: 0,
    description:
      'Grupo Galé is a Colombian salsa music band Their album Auténtico was nominated for Latin Grammy Award for Best Salsa Album at the Latin Grammy Awards of 2008.',
    tagLine: 'We are Grupo Galé!',
    profilePicture: '',
    userType: 'band'
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
