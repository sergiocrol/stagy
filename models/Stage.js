'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genres = require('../helpers/genres');

const stageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  genre: [
    {
      type: String,
      enum: genres
    }
  ],
  address: {
    type: String
  },
  rating: {
    type: Number,
    devault: 0
  },
  reviewers: {
    type: Number,
    devault: 0
  },
  description: {
    type: String
  },
  tagLine: {
    type: String
  },
  profilePicture: {
    type: String
  },
  userType: {
    type: String
  }
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;
