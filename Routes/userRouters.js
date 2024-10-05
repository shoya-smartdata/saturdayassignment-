const express = require('express');
const { signup, login } = require('../Controllers/userController');
const router = express.Router();

// User registration
router.post('/signup', signup);

// User login
router.post('/login', login);

module.exports = router;
