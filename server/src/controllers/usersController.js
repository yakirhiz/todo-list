const pool = require('../db');
const { generateToken, verifyPassword, hashPassword } = require('../auth');

/* Sign up */
const signup = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        const checkQuery = 'SELECT * FROM users WHERE username = $1';
        const { rowCount } = await pool.query(checkQuery, [username]);

        if (rowCount > 0) {
            return res.status(409).json({ error: `A user named '${username}' already exists.` });
        }

        const query = 'INSERT INTO users (username, hashed_password) VALUES ($1, $2) RETURNING *';
        await pool.query(query, [username, hashedPassword]);

        const token = generateToken(username); // You might want to use insertResult.rows[0].id here
        res.status(201).json({ username, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

/* Login */
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows, rowCount } = await pool.query(query, [username]);

        if (rowCount === 0) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        if (!(await verifyPassword(password, rows[0].hashed_password))) {
            return res.status(401).json({ error: `Password is incorrect.` });
        }

        const token = generateToken(username);
        res.status(200).json({ username, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

/* Update user */
const updateUser = async (req, res) => {
    const { id: username } = req.params;
    const { password } = req.body;

    // Ensure the user is attempting to update themselves
    if (username !== req.user.username) {
        return res.status(403).json({ error: `You cannot update other users.` });
    }

    if (!password) {
        return res.status(400).json({ error: `No fields to update.` });
    }

    const hashedPassword = await hashPassword(password);

    try {
        const query = 'UPDATE users SET hashed_password = $1 WHERE username = $2 RETURNING *';
        const { rows, rowCount } = await pool.query(query, [hashedPassword, username]);

        if (rowCount === 0) {
            res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

/* Delete user */
const deleteUser = async (req, res) => {
    const { id: username } = req.params;

    // Ensure the user is attempting to delete themselves
    if (username !== req.user.username) {
        return res.status(403).json({ error: `You cannot delete other users.` });
    }

    try {
        const query = 'DELETE FROM users WHERE username = $1 RETURNING *';
        const { rows, rowCount } = await pool.query(query, [username]);

        if (rowCount === 0) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { signup, login, updateUser, deleteUser };