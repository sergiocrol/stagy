'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const requestSchema = new Schema({
  fromModel: String,
  sendId: {
    type: ObjectId
  },
  toModel: String,
  recId: {
    type: ObjectId
  },
  message: {
    type: String
  },
  date: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'canceled', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
}, { toObject: { virtuals: true } });

requestSchema.virtual('from', {
  ref: doc => doc.fromModel,
  localField: 'fromId',
  foreignField: '_id',
  justOne: true
});

requestSchema.virtual('to', {
  ref: doc => doc.toModel,
  localField: 'toId',
  foreignField: '_id',
  justOne: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
