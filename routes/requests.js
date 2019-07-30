'use strict';

const express = require('express');
const router = express.Router();

const Request = require('../models/Request');

router.get('/', (req, res, next) => {
  res.redirect('/requests/list');
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
    const requests = await Request.find({
      $and: [{ status: 'pending' }, { $or: [{ sendId }, { recId: sendId }] }]
    }).populate('from to');
    res.render('notifications', { requests });
  } catch (error) {
    next(error);
  }
});

router.post('/response/:id', async (req, res, next) => {
  const id = req.params.id;
  const newStatus = req.body.accept ? req.body.accept : req.body.reject;
  try {
    const request = await Request.findByIdAndUpdate(
      id,
      { $set: { status: newStatus } },
      { new: true }
    );
    console.log('\n>>> Request <<<\n', request);
  } catch (error) {
    next(error);
  }
  res.redirect('/requests/notifications');
});

module.exports = router;
