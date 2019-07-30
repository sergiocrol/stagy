'use strict';

const express = require('express');
const router = express.Router();

const Request = require('../models/Request');

router.get('/', (req, res, next) => {
  res.redirect('/requests/list');
});

router.get('/list', async (req, res, next) => {
  try {
    const sendId = req.session.currentUser._id;
    const recId = req.session.currentUser._id;
    const requests = await Request.find({ $or: [{ sendId }, { recId }] }).sort({ date: 1 }).populate('from to');
    // console.log('<<<requests>>>: ', requests);
    res.render('requests', { requests });
  } catch (error) {
    next(error);
  }
});

router.get('/notifications', async (req, res, next) => {
  try {
    const sendId = req.session.currentUser._id;
    const requests = await Request.find({ sendId }).populate('from to');
    console.log('<<<Requests>>>:', requests[0]);
    res.render('notifications', { requests });
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
    });
    res.redirect(req.get('referer'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
