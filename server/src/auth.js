const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        res.sendStatus(401);
    }
};

const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1hr' });
};

module.exports = { authenticate, generateToken };