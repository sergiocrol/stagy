const express = require('express');
const router = express.Router();

const Request = require('../models/Request');

router.get('/', async (req, res, next) => {
  res.render('requests');
});

router.post('/', async (req, res, next) => {
  const { recId, type } = req.query;
  const sendId = req.session.currentUser._id;
  const { date, message } = req.body;
  const fromModel = type === 'stage' ? 'Stage' : 'Band';
  const toModel = type === 'band' ? 'Stage' : 'Band';
  // const model = type === 'stage' ? Stage : Band;
  try {
    const newRequest = await Request.create({
      fromModel,
      toModel,
      sendId: sendId,
      recId,
      message,
      date
    });
    // await Request.findByIdAndUpdate(newRequest._id, { sendId, recId });
    res.redirect('/requests');
    console.log(newRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
