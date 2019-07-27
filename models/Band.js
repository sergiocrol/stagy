'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = require('./Location');
const genres = require('../helpers/genres');

const bandSchema = new Schema({
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
  otherLocations: [
    {
      type: locationSchema
    }
  ],
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
    type: String
  },
  profilePicture: {
    type: String
  },
  userType: {
    type: String
  }
});

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;
