const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const bcrypt = express('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const PORT = process.env.PORT ?? 8000;
/**
 * TODOS:
 * 1. Save todos in database
 * 2. Authenticate users w/ jwt
 * 3. Upgrade the progress bar feature
 * 4. Commit to github & deploy to AWS
 * 5. Insert variables to .env file
 */

console.log(process.env.JWT_SECRET)

/* DEBUG */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

// let users = { "root" : { password: "123" } };

/* Todos API routing */
app.use('/todos', require('./routes/todoRoute'));

/* Sign up */
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // TODO: Hashing the password
    // const salt = bcrypt.genSalt("10");
    // const hashedPassword = bcrypt.hash(password, salt);

    try {
        const ret = await pool.query('INSERT INTO users (username, hashed_password) VALUES ($1, $2)', [username, password]);
        // TODO: Send token
        // const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1hr' });
        // res.status(201).json({username, token});
        res.json({ username });
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
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (users.rows.length < 1) {
            res.json({ error: `A user named '${username}' does not exists.` });
        } else if (users.rows[0].hashed_password !== password) {
            res.json({ error: `Password is incorrect.` });
        } else {
            // TODO: Send token
            // const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1hr' });
            // res.json({username, token});
            res.json({ username });
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

/* Serve frontend */
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
// })

// app.get('*', (req, res) => {
//     res.sendFile('index.html', { 
//         root: path.join(__dirname, '../client/build')
//     });
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));