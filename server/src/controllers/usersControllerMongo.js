const { generateToken, verifyPassword, hashPassword } = require('../auth');
const User = require('./models/User.js');

/* Sign up */
const signup = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(409).json({ error: `A user named '${username}' already exists.` });
        }

        const user = new User({
            username: username,
            hashed_password: hashedPassword
        });

        const userFromDB = await user.save();
        const token = generateToken(username);
        res.status(201).send({ username, token });
    } catch (err) {
        res.status(500).json({ error: `Internal server error.` });
    }
};

/* Login */
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userInDB = await User.findOne({ username });

        if (!userInDB) {
            res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        if (!(await verifyPassword(password, userInDB.password))) {
            res.status(401).json({ error: `Password is incorrect.` });
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
    const { id:username } = req.params;
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
        const userInDB = await User.findOneAndUpdate(
            { username },
            { hashed_password: hashedPassword },
            { new: true }
        );

        if (!userInDB) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        res.status(200).json({ username, hashedPassword });
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
        const userInDB = await User.findOneAndDelete({ username });

        if (!userInDB) {
            return res.status(404).json({ error: `A user named '${username}' does not exist.` });
        }

        res.status(200).json({ message: `User '${username}' deleted successfully.` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { signup, login, updateUser, deleteUser };