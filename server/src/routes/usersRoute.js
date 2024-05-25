const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { signup, login } = require('../controllers/usersController')

router.use('/', (req, res, next) => {
    console.log(`Handling user request...`);
    next();
});

router.post('/signup', signup);
router.post('/login', login);
// router.put('/login', /* handler */);
// router.delete('/login', /* handler */);

module.exports = router;