const express = require('express'); 
const router = express.Router();

const { register, login, logout } = require('../controllers/authcontroller.js');
const verifyToken = require('../middleware/auth');

// use the destructured function names directly
router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout); // Add middleware here to extract token info

module.exports = router;