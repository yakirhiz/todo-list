const Todo = require('./models/Todo.js');

const getTodos = async (req, res) => {
    const username = req.user.username;

    try {
        const todos = await Todo.find({ username: username });
        res.status(200).json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const createTodo = async (req, res) => {
    const username = req.user.username;
    const { title, progress } = req.body;

    try {
        const todo = new Todo({
            username: username,
            title: title,
            progress: progress
        });

        const todoFromDB = await todo.save()
        res.status(201).json(todoFromDB);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const updateTodo = async (req, res) => {
    const username = req.user.username;
    const { id } = req.params;
    const { title, progress } = req.body;

    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: id, username: username },
            { title, progress },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(todo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const deleteTodo = async (req, res) => {
    const username = req.user.username;
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndDelete({
            _id: id,
            username: username
        });

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json(todo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };