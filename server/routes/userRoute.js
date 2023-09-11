const express = require('express');
const router = express.Router();

const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// let users = { "root" : { password: "123" } };

/* Sign up */
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // TODO: Hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);


    try {
        const query = 'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *';
        await pool.query(query, [username, hashedPassword]);
        const token = generateToken(username);
        res.status(201).json({ username, token });
    } catch (err) {
        res.json({ error: err.detail }); // NOTE: Forward error
    }

    // if (username in users) {
    //     res.json({ error: `A user named '${username}' already exists.` });
    // } else {
    //     users[username] = {password}
    //     res.json({ username });
    // }
})

/* Login */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const users = await pool.query(query, [username]);
        if (users.rows.length < 1) {
            res.json({ error: `A user named '${username}' does not exists.` });
        } else if (!(await bcrypt.compare(password, users.rows[0].hashed_password))) {
            console.log(await bcrypt.compare(password, users.rows[0].hashed_password))
            res.status(403).json({ error: `Password is incorrect.` });
        } else {
            const token = generateToken(username);
            res.json({ username, token });
        }

    } catch (err) {
        console.log(err);
    }

    // if (!(username in users)) {
    //     res.json({ error: `A user named '${username}' does not exists.` });
    // } else if (users[username].password !== password) {
    //     res.json({ error: `Password is incorrect.` });
    // } else {
    //     res.json({ username });
    // }
})

const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr' });
}

module.exports = router;