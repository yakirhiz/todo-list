const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const router = require("./router.js");

/* DEBUG - Print request and time to console */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}, (req, res, next) => {
    console.log(`Time: ${new Date(Date.now()).toString()}`);
    next();
});

const whitelist = ['http://localhost:3000']; // authorized origins

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
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// Error Handler Middleware (Last middleware to use)
app.use(
    function errorHandler(err, req, res, next) {
        if (res.headersSent) {
            return next(err)
        }

        console.error("[ERROR OCCURED] Triggering error handler...");
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
);

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/users')
//     .then(() => console.log('Connected to mongoDB!'))
//     .catch((e) => console.log(e));

/* Serve frontend (v1) */
// app.use(express.static(path.join(__dirname, '../../client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'));
// })

/* Serve frontend (v2) */
// app.get('*', (req, res) => {
//     res.sendFile('index.html', { 
//         root: path.join(__dirname, '../../client/build')
//     });
// })

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));