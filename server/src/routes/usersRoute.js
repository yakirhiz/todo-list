const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { signup, login } = require('../controllers/usersController')

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;