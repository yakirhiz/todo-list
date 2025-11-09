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

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, progress } = req.body;

    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: id, username: req.user.username },
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
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndDelete({
            _id: id,
            username: req.user.username
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