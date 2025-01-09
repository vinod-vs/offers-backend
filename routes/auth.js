const express = require('express');
const { register, login } = require('../controllers/authController'); // Import controllers
const { validateRegistration, validateLogin } = require('../middleware/validation'); // Input validation middleware

const router = express.Router();

// Routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

module.exports = router;
