const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const router = require("./routes.js");

/* DEBUG - Print request and time to console */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}, (req, res, next) => {
    console.log(`Time: ${new Date(Date.now()).toString()}`);
    next();
})

app.use(cors());
app.use(express.json());
app.use(router);

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