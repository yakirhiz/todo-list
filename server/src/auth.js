const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    // Need to check that user exists in the database
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({ error: `Authorization header missing or invalid.` });

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET); // decode func vs verify func
        // Need to verify with username (from req)
        next();
    } catch (e) {
        res.status(401).json({ error: `Invalid token.` });
    }
};

const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr' });
};

module.exports = { authenticate, generateToken };