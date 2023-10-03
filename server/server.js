const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

/**
 * TODOS:
 * 1. Commit to github & deploy to AWS
 */

/* DEBUG - Print request and time to console */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}, (req, res, next) => {
    console.log(`Time: ${new Date(Date.now()).toString()}`)
    next()
})

app.use(cors());
app.use(express.json());

/* Routing */
app.use('/users', require('./src/routes/userRoute'));
app.use('/todos', require('./src/routes/todoRoute'));

/* Serve frontend (v1) */
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
// })

/* Serve frontend (v2) */
// app.get('*', (req, res) => {
//     res.sendFile('index.html', { 
//         root: path.join(__dirname, '../client/build')
//     });
// })

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));