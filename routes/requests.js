'use strict';

const express = require('express');
const router = express.Router();

const Request = require('../models/Request');
const moment = require('moment');

router.get('/', async (req, res, next) => {
  try {
    const sendId = req.session.currentUser._id;
    const recId = req.session.currentUser._id;
    const requests = await Request.find({ $or: [{ sendId }, { recId }] }).sort({ date: 1 }).populate('from to');
    console.log('<<<requests>>>: ', requests);
    res.render('requests', { requests });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { recId, type } = req.query;
  const sendId = req.session.currentUser._id;
  const { date, message } = req.body;
  const fromModel = type === 'stage' ? 'Stage' : 'Band';
  const toModel = type === 'band' ? 'Stage' : 'Band';
  try {
    await Request.create({
      fromModel,
      toModel,
      sendId,
      recId,
      message,
      date
      // date: moment(date).format('MMM Do YY')
    });
    // res.redirect('/requests');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
