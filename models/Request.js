'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const requestSchema = new Schema({
  fromModel: String,
  senderId: {
    type: ObjectId,
    ref: this.fromModel
  },
  toModel: String,
  receiverId: {
    type: ObjectId,
    ref: this.toModel
  },
  message: {
    type: String
  },
  date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'canceled', 'resolved']
  }
}, {
  timestamps: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
