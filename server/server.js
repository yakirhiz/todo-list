const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const bcrypt = express('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT ?? 8000;
/**
 * TODOS:
 * 1. Save users & todos in databases
 * 2. Authenticate users w/ jwt
 * 4. Upgrade the progress bar feature
 * 5. commit to github & deploy
 * 6. create an SQL file with database manipulation commands
 * 7. add .env file & insert stuff to i
 */

console.log(process.env.JWT_SECRET)

/* DEBUG */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

let users = {
    "yakir" : { password: "123" },
    "john" : { password: "333" }
}

/* Todos api routing */
app.use('/todos', require('./routes/todoRoute'));

/* Sign up */
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // TODO: Hashing the password
    // const salt = bcrypt.genSalt("10");
    // const hashedPassword = bcrypt.hash(password, salt);

    try {
        // TODO: Insert user to database

        // const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1hr' });

        // res.status(201).json({username, token});
    } catch (err) {
        console.log(err);
    }

    if (username in users) {
        res.json({ error: `A user named '${username}' already exists.` });
    } else {
        users[username] = {password}
        res.json({ username });
    }
})

/* Login */
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        // TODO: Check if the user is in the DB

        // const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1hr' });

        // res.json({username, token});
    } catch (err) {
        console.log(err);
    }

    if (!(username in users)) {
        res.json({ error: `A user named '${username}' does not exists.` });
    } else if (users[username].password !== password) {
        res.json({ error: `Password is incorrect.` });
    } else {
        res.json({ username });
    }
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