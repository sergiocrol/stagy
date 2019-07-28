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
    default: 0
  },
  reviewers: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  tagLine: {
    type: String,
    default: 'A catchy phrase about you'
  },
  profilePicture: {
    type: String,
    default:
      'https://res.cloudinary.com/dlpn1f27n/image/upload/v1564306511/stagy/lu9nat7087pmibthplvz.png'
  },
  userType: {
    type: String
  }
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;
