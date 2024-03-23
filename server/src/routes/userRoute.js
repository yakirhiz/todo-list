const router = require('express').Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* Sign up */
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const query = 'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *';
        await pool.query(query, [username, hashedPassword]);

        const token = generateToken(username);
        res.status(201).json({ username, token });
    } catch (err) {
        res.json({ error: err.detail }); // NOTE: Forward error (not safe)
    }
});

/* Login */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const users = await pool.query(query, [username]);

        if (users.rows.length < 1) {
            res.json({ error: `A user named '${username}' does not exist.` });
        } else if (!(await bcrypt.compare(password, users.rows[0].hashed_password))) {
            res.status(403).json({ error: `Password is incorrect.` });
        } else {
            const token = generateToken(username);
            res.json({ username, token });
        }

    } catch (err) {
        res.status(500).json({ error: `Internal server error.` });
    }
});

const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr' });
}

module.exports = router;