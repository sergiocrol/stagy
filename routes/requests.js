'use strict';

const express = require('express');
const router = express.Router();

const Request = require('../models/Request');
const { signinRequired } = require('../middlewares/authMiddlewares');

router.get('/', (req, res, next) => {
  res.redirect('/requests/list');
});

router.post('/', async (req, res, next) => {
  if (!req.session.currentUser) { res.redirect('/auth/login/'); };
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

router.get('/list', signinRequired, async (req, res, next) => {
  if (!req.session.currentUser) { res.redirect('/auth/login/'); };
  try {
    const sendId = req.session.currentUser._id;
<<<<<<< Updated upstream
    const requests = await Request.find({ $and: [
      { $or: [{ status: 'accepted' }, { status: 'rejected' }, { status: 'canceled' }] },
      { $or: [{ sendId }, { recId: sendId }] }] }).sort({ date: -1 }).populate('from to');
    res.render('requests', { requests });
=======
    const recId = req.session.currentUser._id;
    const userBand = req.session.currentUser.userType === 'band' ? 'userBand' : '';
    const requests = await Request.find({ $or: [{ sendId }, { recId }] })
      .sort({ date: -1 })
      .populate('from to');
    console.log('\n>>> !!! <<<\n\n', req.session.currentUser);

    res.render('requests', { requests, userBand });
>>>>>>> Stashed changes
  } catch (error) {
    next(error);
  }
});

router.get('/notifications', signinRequired, async (req, res, next) => {
  try {
    const sessionId = req.session.currentUser._id;
    const requests = await Request.find({
      $and: [
        { status: 'pending' },
        { $or: [{ sendId: sessionId }, { recId: sessionId }] }
      ]
    }).populate('from to');
    const userBand = req.session.currentUser.userType === 'band' ? 'userBand' : '';

<<<<<<< Updated upstream
=======
    // console.log('\n>>> !!! <<<\n\n');
    // console.log(requests);

    // console.log('sessionId:', sessionId);
    // console.log('requests.sendId:', requests.sendId);
    // console.log('fromModel:', requests.fromModel);

>>>>>>> Stashed changes
    res.render('notifications', { requests, userBand });
  } catch (error) {
    next(error);
  }
});

router.post('/response/:id', signinRequired, async (req, res, next) => {
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

router.post('/delete/:id', signinRequired, async (req, res, next) => {
  const id = req.params.id;
  try {
    await Request.deleteOne({ _id: id });
    res.redirect('/requests/notifications');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
