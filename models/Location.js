'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  city: {
    type: String,
    require: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

module.exports = locationSchema;
