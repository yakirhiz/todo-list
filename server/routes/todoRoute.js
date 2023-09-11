const express = require('express');
const router = express.Router();

const pool = require('../db');

// let todos = [
//     { id: "0", username: "yakir", title: "Eat breakfast", progress: 0 }, 
//     { id: "1", username: "hizki", title: "Eat lunch", progress: 50  }
// ];

// let index = todos.length;

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const query = 'SELECT * FROM todos WHERE username = $1';
        const todos = await pool.query(query, [username]);
        res.json(todos.rows);
    } catch (err) {
        console.log(err);
    }

    // ret = todos.filter(item => item.username === username);
    // res.json(ret);
})

/* Maybe change the return value from the following routes */
router.post('/', async (req, res) => {
    const { username, title, progress } = req.body;

    try {
        const query = 'INSERT INTO todos (username, title, progress) VALUES ($1, $2, $3) RETURNING *';
        const ret = await pool.query(query, [username, title, progress]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
    }

    // let id = `${index}`;
    // todos.push({ id, username, title, progress });
    // index++;
    // res.json(todos);
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, title, progress } = req.body;

    try {
        const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
        const ret = await pool.query(query, [title, progress, id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
    }

    // todos = todos.map((item) => item.id === id ? { id, username, title, progress } : item);
    // res.json(todos);
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
        const ret = await pool.query(query, [id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
    }

    // todos = todos.filter(item => item.id !== id);
    // res.json(todos);
})

module.exports = router;