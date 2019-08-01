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
    name: 'Heliogabal',
    email: 'heliogabal@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: [
      'Blues',
      'Classical',
      'Experimental',
      'Indie',
      'Instrumental',
      'Jazz',
      'Orchestra',
      'Pop',
      'Reggae',
      'Rock',
      'Soul',
      'Swing'
    ],
    address: 'Ramón y Cajal, 80',
    rating: 4.5,
    reviewers: 2,
    description:
      "As a space for dissemination, Heliogabal promotes the meeting between the public, neighbors, artists, groups and associations and collaborates with other platforms of the cultural and artistic fabric of Barcelona, ​​such as independent labels and publishing houses. In the fifteen years of activity, the headquarters of the Heliogabal Cultural Association has become a point of reference for the revitalization of Gracia's artistic life, both for the neighbors and for the artists who take part in the activities that take place.",
    tagLine: 'One of the musical poles and the night of Gracia',
    userType: 'stage',
    profilePicture:
      'https://media.timeout.com/images/100591221/750/422/image.jpg'
  },
  {
    name: 'London Bar',
    email: 'london@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Blues', 'Experimental', 'Instrumental', 'Jazz', 'Pop', 'Swing'],
    address: 'Nou de la Rambla, 34',
    rating: 4.9,
    reviewers: 8,
    description:
      'Countless generations doing elbows since 1910, the platonic idea of ​​a bar that many of us have is that of London. The story is cynical-proof: before the war, London was a meeting point and rehearsal for circus artists. Two acrobats had a contract to go to northern Europe but they lacked a third. And Eli\'s grandfather (former owner) recommended that they go find Raluy\'s father, London parishioner, worker and amateur artist. By a stir he left the factory of Sant Adrià and packed. "I can\'t leave a London Bar: the circus returns where we come from and that is part of us," he says.',
    tagLine: 'Without London there would be no Raluy',
    userType: 'stage',
    profilePicture:
      'https://media.timeout.com/images/100575817/750/422/image.jpg'
  },
  {
    name: 'Tarantos',
    email: 'tarantos@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Folk', 'Latin', 'Jazz'],
    address: 'Pl. Reial, 17',
    rating: 3.9,
    reviewers: 5,
    description:
      'A place that has presented the great names of flamenco and rumba. Next to a mythical room like Jamboree, it is nothing unusual to see how jazz and flamenco lovers converge at the entrance.',
    tagLine: "A historical 'tablao'",
    userType: 'stage',
    profilePicture:
      'https://media.timeout.com/images/100575811/750/422/image.jpg'
  },
  {
    name: 'Harlem Jazz Club',
    email: 'harlem@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Jazz', 'Swing'],
    address: 'Comtessa de Sobradiel, 8',
    rating: 4.2,
    reviewers: 6,
    description:
      'If you need a dose of live music, the Harlem Jazz Club is always there. Few times a year you find the room in silence. You do not need a green cross illuminated at all times. Even him, the Guiris and the people of Barcelona approach. Some get lost before arriving. Al Harlem is going to see what happens but, above all, to see who plays. In the dark, sitting in the chairs, or standing, squeezed in the bar, we hear the concert of the small stage. Under the neon sign, all blues songs are written and lonely cats are welcome.',
    tagLine: 'As a pharmacy on call, this Gotico place comes to mind',
    userType: 'stage',
    profilePicture:
      'https://media.timeout.com/images/100575909/750/422/image.jpg'
  },
  {
    name: 'Gran Bodega Salto',
    email: 'salto@mail.com',
    password: '$2b$10$TikfOi76JLJUzKjvH7pHVeiNmqHKQ0cbMuHc6NneGrbteI2y7gtsW',
    location: 'barcelona',
    genre: ['Rock', 'Alternative rock', 'Pop', 'Indie'],
    address: 'Blesa, 36',
    rating: 4.3,
    reviewers: 11,
    description:
      'La Salto has been one of the pioneers in converting the Poble-sec into one of the liveliest neighborhoods in the city. In fact, their schedules are more of a night bar than a store, which does not prevent some neighbors from going down at night to fill their carafes of barrel wine. But its oenological offer is not the main attraction of Bodega Salto. Renovated by designer Steve Foster in 2002, it works as a small fair of extravagance where you can find all kinds of andromines, antiguallas, stuffed tigers or puppets that drink in porron.',
    tagLine: 'Hard to find a place this picturesque in Barcelona',
    userType: 'stage',
    profilePicture:
      'https://media.timeout.com/images/100617011/750/422/image.jpg'
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
