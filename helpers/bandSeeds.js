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
    name: 'Edu Cabello',
    email: 'edu@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Jazz', 'Swing'],
    rating: 4.8,
    reviewers: 4,
    description:
      "I've been dedicating myself to music for about 15 years. I was born in Malaga but now I live in Barcelona where I develop my artistic activity. Now I am starting my first project as a leader, whose first album is already on sale!",
    tagLine: 'I am a jazz saxophonist.',
    profilePicture:
      'https://dz8pdz0wfluv5.cloudfront.net/production/bands/avatars/000/008/239/original/21617823_526367251043605_7792045065628208882_n.jpg',
    userType: 'band'
  },
  {
    name: 'Maria Esteban',
    email: 'maria@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Jazz', 'Swing', 'Blues'],
    rating: 4.9,
    reviewers: 8,
    description:
      'María Esteban, born in Malaga. Her passion for music leads him to start her artistic career from a young age with musical projects. She has participated in various festivals such as: The Baja Bop Red Hot Rockin Festival (Los Angeles, USA), Nájera Jazz Festival (Antequera, Málaga), Rock this town (Solothurn, Switzerland), 24th Rocking Race Jamboree (Torremolinos, Málaga), 26th Malaga International Jazz Festival, Sintonizza Festival 2016 (Barcelona), 8th Reencontes du qé Arts Festival (Aix en Provece, France), 2016 Water Enclave Festival (Soria), 19th MAF Malaga Film Festival, 39th Jazz Festival Getxo, 1st prize at the 2014 Portón del Jazz Festival, etc...',
    tagLine: 'Great passion for singing',
    profilePicture:
      'https://dz8pdz0wfluv5.cloudfront.net/production/bands/avatars/000/012/511/original/_DSC0938_RE_web.jpg',
    userType: 'band'
  },
  {
    name: 'The Chronicles',
    email: 'chronicles@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Rock', 'Hard rock', 'Grunge'],
    rating: 4.7,
    reviewers: 11,
    description:
      'Our project is different from other covers. Our artistic name is The Chronicles and we stage a newsroom telling some anecdote of the singer or the song very fast even playing the song behind. We have played as opening act in the Razzmataz Hall for example. We mount enough party and interact with the public quite a lot. We have played at the Begues Beer Town obtaining an excellent review',
    tagLine: 'We are a rock band of great musical quality',
    profilePicture:
      'https://dz8pdz0wfluv5.cloudfront.net/production/bands/avatars/000/011/683/original/8Y8A0362.jpg',
    userType: 'band'
  },
  {
    name: 'Los Monos Voladores del Sr. Burns',
    email: 'monosvoladores@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Rock', 'Pop'],
    rating: 4.2,
    reviewers: 2,
    description:
      'Los Monos Voladores del Sr. Burns is a power trio that covers classics and not so classics of Spanish music, but in its style. Fun and popular versions of the most popular hits of popular music in Castilian from the 60s to the present day reviewed in the key of rock to sing and dance doing the monkey.',
    tagLine: 'Spanish music done our style',
    profilePicture:
      'https://dz8pdz0wfluv5.cloudfront.net/production/bands/avatars/000/004/904/original/Monos-1024x1024.jpg',
    userType: 'band'
  },
  {
    name: 'Sobra la Marcha',
    email: 'marcha@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Latin', 'Pop'],
    rating: 4.3,
    reviewers: 6,
    description:
      'Sobra La Marcha is a band born on the fly, formed in the Penitents neighborhood, Barcelona. It is a group of Catalan Rumba with African touches in their percussion. It all started with Goyo guitar in hand and bass drum, inspired by the most flamenco songs of Catalonia. Then Ousseynou arrived introducing his African touch, with his percussion that leaves no one indifferent. Blanca, with its rumbero flavor gives the female voice to the group. The last to get in the car is Checho, the Argentine bassist who gives his jazz and funk touch to the group.',
    tagLine: 'If you want to dance, follow us on this Rumbero trip',
    profilePicture:
      'https://dz8pdz0wfluv5.cloudfront.net/production/bands/avatars/000/008/507/original/26756997_2202625589751488_5193754249166943099_o.jpg',
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
