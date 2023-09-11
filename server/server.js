const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT ?? 8000;
/**
 * TODOS:
 * 1. Authenticate users w/ jwt (token is send but not used for authentication)
 * 2. Commit to github & deploy to AWS
 */

/* DEBUG */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

/* Routing */
app.use('/todos', require('./routes/todoRoute'));
app.use('/', require('./routes/userRoute'));

/* Serve frontend */
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
// })

// app.get('*', (req, res) => {
//     res.sendFile('index.html', { 
//         root: path.join(__dirname, '../client/build')
//     });
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));