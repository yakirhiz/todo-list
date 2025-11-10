let todos = [];

function createIdGenerator() {
    let currentId = 0; // Private state for the ID counter
    return function() {
        return currentId++;
    };
}

const generateId = createIdGenerator();

const getTodos = async (req, res) => {
    const username = req.user.username;

    try {
        const result = todos.filter(todo => todo.username === username);

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const createTodo = async (req, res) => {
    const username = req.user.username;
    const { title, progress } = req.body;

    try {
        todos.push({ id: generateId(), username, title, progress });

        res.status(201).json(todos.at(-1));
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
        const updatedIndex = todos.findIndex(todo => todo.id.toString() === id);

        if (updatedIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Check ownership
        if (todos[updatedIndex].username !== username) {
            return res.status(403).json({ error: "Forbidden" });
        }

        todos[updatedIndex] = { ...todos[updatedIndex], title, progress };

        res.status(200).json(todos[updatedIndex]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

const deleteTodo = async (req, res) => {
    const username = req.user.username;
    const { id } = req.params;

    try {
        const deletedIndex = todos.findIndex(todo => todo.id.toString() === id);

        if (deletedIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Check ownership
        if (todos[deletedIndex].username !== username) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const [ deletedTodo ] = todos.splice(deletedIndex, 1);

        res.status(200).json(deletedTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: `Internal server error.` });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };