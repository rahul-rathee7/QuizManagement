const express = require('express');
const router = express.Router();
const { register, login, getUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

// Student routes
router.post('/student/register', register);
router.post('/student/login', login);

// Admin routes
router.post('/admin/login', login);

// Profile route
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
