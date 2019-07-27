'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dlpn1f27n',
  api_key: '845169441673237',
  api_secret: 'qTejU6c3NO95PwUsJrJQL88QBxU'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'stagy',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;
