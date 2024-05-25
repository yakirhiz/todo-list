const { generateToken } = require('../auth');
const bcrypt = require('bcrypt');
const User = require('./models/User.js');

/* Sign up */
const signup = async (req, res) => {
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {

        const isUserExist = await User.findOne({ email });
        if (isUserExist)
            return res.status(500).json({ error: "user exists!" });

        const user = new User({
            username: username,
            hashed_password: hashedPassword
        });

        const userFromDB = await user.save()
        res.send(userFromDB)
    } catch (err) {
        res.status(500).json({ error: err.detail }); // NOTE: Forward error (not safe)
    }
};

/* Login */
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userInDB = await User.findOne({ username });

        if (!userInDB) {
            res.status(404).json({ error: `A user named '${username}' does not exist.` });
        } else if (!(await bcrypt.compare(password, userInDB.password))) {
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

/* Delete user */

module.exports = { signup, login };