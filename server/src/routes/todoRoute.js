const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`Handle GET request from ${decode.username}`);

        next();
    } catch (e) {
        res.sendStatus(401);
    }
}

router.get('/:username', authenticate, async (req, res) => {
    const { username } = req.params;

    try {
        const query = 'SELECT * FROM todos WHERE username = $1 ORDER BY id ASC';
        const ret = await pool.query(query, [username]);
        res.json(ret.rows);
    } catch (err) {
        console.log(err);
    }
})

router.post('/', authenticate, async (req, res) => {
    const { username, title, progress } = req.body;

    try {
        const query = 'INSERT INTO todos (username, title, progress) VALUES ($1, $2, $3) RETURNING *';
        const ret = await pool.query(query, [username, title, progress]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { username, title, progress } = req.body;

    try {
        const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
        const ret = await pool.query(query, [title, progress, id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
        const ret = await pool.query(query, [id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;