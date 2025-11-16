const { generateToken, verifyPassword, hashPassword } = require('../auth');

const users = {}

/* Sign up */
const signup = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        if (username in users) {
            return res.status(409).json({ error: `A user named '${username}' already exists.` });
        }

        users[username] = { username, hashedPassword };

        const token = generateToken(username);
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
        if (!(username in users)) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        if (!(await verifyPassword(password, users[username].hashedPassword))) {
            return res.status(401).json({ error: `Password is incorrect.` });
        }
        
        const token = generateToken(username);
        res.status(200).json({ username, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

/* Update user (not finished) */
const updateUser = async (req, res) => {
    const { id: username } = req.params;
    const { password } = req.body;

    // Ensure the user is attempting to update themselves
    if (username !== req.user.username) {
        return res.status(403).json({ error: `You cannot delete other users.` });
    }

    if (!password) {
        return res.status(400).json({ error: `No fields to update.` });
    }

    const hashedPassword = await hashPassword(password);

    try {
        if (!(username in users)) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        users[username].hashedPassword = hashedPassword;

        res.status(200).json(users[username]);
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
        if (!(username in users)) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        const deletedUser = users[username];

        delete users[username];

        res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { signup, login, updateUser, deleteUser };