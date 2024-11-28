const express = require('express');
const { getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); // JWT validation middleware

const router = express.Router();

// Protected route for getting the user's profile
router.get('/profile', protect, getProfile);

module.exports = router;
