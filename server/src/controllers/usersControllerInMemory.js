const { generateToken } = require('../auth');
const bcrypt = require('bcrypt');

// TODO: Build error handling in these routes

const users = {}

/* Sign up */
const signup = async (req, res, next) => {
    const { username, password } = req.body;

    // throw new Error('Just because');
    // return next(new Error('Just because'));

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (username in users) {
        return res.status(409).json({ error: `user ${username} is already exists.` });
    }

    users[username] = {username, hashedPassword}
    console.log(users);
    const token = generateToken(username);
    res.status(201).json({ username, token });
};

/* Login */
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!(username in users)) {
        return res.status(404).json({ error: `A user named '${username}' does not exist.` });
    }

    if (!(await bcrypt.compare(password, users[username].hashedPassword))) {
        return res.status(401).json({ error: `Password is incorrect.` });
    }
    
    const token = generateToken(username);
    res.status(200).json({ username, token });
};

/* Update user */

/* Delete user */
// const deleteUser = async (req, res) => {
//     const { username, password } = req.body;

//     if (!(username in users)) {
//         return res.status(404).json({ error: `A user named '${username}' does not exist.` });
//     }

//     delete users[username];
//     console.log(users);
//     res.sendStatus(204);
// };

module.exports = { signup, login };