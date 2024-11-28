const express = require('express');
const passport = require('passport');
const { googleAuth, googleAuthCallback } = require('../controllers/authController');

const router = express.Router();

// Google login route
router.get('/google', googleAuth);

// Google callback route
router.get('/google/callback', googleAuthCallback);

module.exports = router;
