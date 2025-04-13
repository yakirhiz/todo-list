const cors = require('cors');

const whitelist = ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:5500/']; // authorized origins

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            console.log(`origin: ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = function () {
    return cors(corsOptions); // Returns function
}