const Todo = require('./models/Todo.js');

const getTodos = async (req, res) => {
    const { username } = req.params;

    try {
        const todos = await Todo.find({ username: username });

        if (!todos)
            return res.status(500).json({ error: "Error" });

        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

const createTodo = async (req, res) => {
    const { username, title, progress } = req.body;

    try {
        const todo = new Todo({
            username: username,
            title: title,
            progress: progress
        });

        const todoFromDB = await todo.save()
        res.status(201).send(todoFromDB);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// TODO: need to user document id

// const updateTodo = async (req, res) => {
//     const { id } = req.params;
//     const { username, title, progress } = req.body;

//     try {
//         const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
//         const ret = await pool.query(query, [title, progress, id]);
//         res.json(ret.rows[0]);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// };

// const deleteTodo = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
//         const ret = await pool.query(query, [id]);
//         res.json(ret.rows[0]);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// };

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };