// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// @route   POST api/auth/signup
// @desc    Register user
router.post('/signup', signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', login);

module.exports = router;