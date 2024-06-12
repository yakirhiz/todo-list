const pool = require('../db');

const getTodos = async (req, res) => {
    const { username } = req.params;

    try {
        const query = 'SELECT * FROM todos WHERE username = $1 ORDER BY id ASC';
        const ret = await pool.query(query, [username]);
        res.json(ret.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const createTodo = async (req, res) => {
    const { username, title, progress } = req.body;

    try {
        const query = 'INSERT INTO todos (username, title, progress) VALUES ($1, $2, $3) RETURNING *';
        const ret = await pool.query(query, [username, title, progress]);
        res.status(201).json(ret.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { username, title, progress } = req.body;

    try {
        const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
        const ret = await pool.query(query, [title, progress, id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
        const ret = await pool.query(query, [id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };