const pool = require('../db');

const getTodos = async (req, res) => {
    const { username } = req.params;

    if (username !== req.user.username) {
        return res.status(403).json({ error: `Forbidden.` });
    }

    try {
        const query = 'SELECT * FROM todos WHERE username = $1 ORDER BY id ASC';
        const { rows } = await pool.query(query, [username]);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const createTodo = async (req, res) => {
    const { username, title, progress } = req.body;

    if (username !== req.user.username) {
        return res.status(403).json({ error: `Forbidden.` });
    }

    try {
        const query = 'INSERT INTO todos (username, title, progress) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await pool.query(query, [username, title, progress]);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, progress } = req.body;

    try {
        // Check if todo belongs to user
        const checkQuery = 'SELECT * FROM todos WHERE id = $1';
        const checkResult = await pool.query(checkQuery, [id]);

        if (checkResult.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        const todo = checkResult.rows[0];
        if (todo.username !== req.user.username) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
        const { rows, rowCount } = await pool.query(query, [title, progress, id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if todo belongs to user
        const checkQuery = 'SELECT * FROM todos WHERE id = $1';
        const checkResult = await pool.query(checkQuery, [id]);

        if (checkResult.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        const todo = checkResult.rows[0];
        if (todo.username !== req.user.username) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
        const { rows, rowCount } = await pool.query(query, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };