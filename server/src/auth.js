const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({ error: `Authorization header missing or invalid.` });

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Need to verify with username from token late on the routes
        // Need to check that user exists in the database
        // Otherwise deleted user w/ token can access authorized routes
        req.user = payload;
        next();
    } catch (e) {
        res.status(401).json({ error: `Invalid token.` });
    }
};

const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr' });
};

const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
};

module.exports = { authenticate, generateToken, verifyPassword, hashPassword };