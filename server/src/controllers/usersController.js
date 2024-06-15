const pool = require('../db');
const { generateToken } = require('../auth');
const bcrypt = require('bcrypt');

/* Sign up */
const signup = async (req, res) => {
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const query = 'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *';
        await pool.query(query, [username, hashedPassword]);

        const token = generateToken(username);
        res.status(201).json({ username, token });
    } catch (err) {
        res.status(500).json({ error: err.detail }); // NOTE: Forward error (not safe)
    }
};

/* Login */
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const users = await pool.query(query, [username]);

        if (users.rows.length < 1) {
            res.status(404).json({ error: `A user named '${username}' does not exist.` });
        } else if (!(await bcrypt.compare(password, users.rows[0].hashed_password))) {
            res.status(401).json({ error: `Password is incorrect.` });
        } else {
            const token = generateToken(username);
            res.json({ username, token });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

/* Update user */
const updateUser = async (req, res) => {
    res.status(500).json({ error: `Update user` });
    // const { username, password } = req.body;

    // try {
    //     const query = 'UPDATE users SET ... WHERE username = $1 RETURNING *';
    //     const users = await pool.query(query, [username]);

    //     if (users.rows.length < 1) {
    //         res.status(404).json({ error: `Deletion failed: a user named '${username}' does not exist.` });
    //     } else {
    //         res.json(ret.rows[0]); // return 204 'No content'
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ error: `Internal server error.` });
    // }
};

/* Delete user */
const deleteUser = async (req, res) => {
    res.status(500).json({ error: `Delete user` });
    // const { username, password } = req.body;

    // try {
    //     const query = 'DELETE FROM users WHERE username = $1 RETURNING *';
    //     const users = await pool.query(query, [username]);

    //     if (users.rows.length < 1) {
    //         res.status(404).json({ error: `Deletion failed: a user named '${username}' does not exist.` });
    //     } else {
    //         res.json(ret.rows[0]); // return 204 'No content'
    //     }
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ error: `Internal server error.` });
    // }
};

module.exports = { signup, login, updateUser, deleteUser };