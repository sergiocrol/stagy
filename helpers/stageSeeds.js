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
    name: 'RockSound',
    email: 'rocksound@test.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Barcelona',
    genre: 'Rock',
    address: 'Carrer dels Almogavers, 116',
    rating: 4.5,
    reviewers: 658,
    description: 'Good venue. Went to see the fantastic Electric Monolith and the Shrine there. Terrific show. Friendly atmosphere, good sound and easy enough to get to the bar. Air-conditioning want working so that made things somewhat uncomfortable. The bass player for the Shrine seemed to have heatstroke after their set. Very good venue, that aside.',
    tagLine: 'Rock and roll place, get ready to sweat at the sound of the music',
    profilePicture: ''
  },
  {
    name: 'El Bombon',
    email: 'bombon@test.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Barcelona',
    genre: 'Salsa',
    address: 'Carrer de la Mercè, 13',
    rating: 3.9,
    reviewers: 265,
    description: 'With a skilled bar staff and a great app here, I\'d highly recommend El Bombón.',
    tagLine: 'Beautiful atmosphere, the place to be if you love salsa',
    profilePicture: ''
  },
  {
    name: 'Sala Marquee',
    email: 'salamarquee@test.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Bilbao',
    genre: 'Salsa',
    address: 'Calle del General Concha, 9',
    rating: 3.6,
    reviewers: 293,
    description: 'It is a modern place beautiful people good music an exquisite treatment of the waiters and all the staff one of the best rooms in Bilbao whenever I can I\'m delighted with the local',
    tagLine: 'The best night club in Bilbao, the best atmosphere and the best people',
    profilePicture: ''
  },
  {
    name: 'Azzurro Rock Pub',
    email: 'azzurro@test.com',
    password: '$2b$10$52sNsu0cA/53KjiIM7aOOuDZyuqN2n5Km0VcG7E3TK9icFbZ2ByMW',
    location: 'Bilbao',
    genre: 'Rock',
    address: 'Aranzadi Kalea, 3',
    rating: 4.6,
    reviewers: 278,
    description: 'A "small big" local, with more than 40 years in operation, located in one of the classic marching areas of downtown Bilbao, on Telesforo Aranzadi Street, number 3, between the Carlton Hotel (Moyúa Square) and the Urquijo Gallery.',
    tagLine: 'The best place to be for good music and friendly atmosphere',
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
