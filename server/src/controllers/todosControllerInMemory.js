let todos = [];

let CURRENT_ID = todos.length; // hold the next id to insert to table

const getTodos = async (req, res) => {
    const { username } = req.params;

    const result = todos.filter((todo) => {
        return todo.username === username;
    })

    res.status(200).json(result);
};

const createTodo = async (req, res) => {
    const { username, title, progress } = req.body;

    todos.push({ id: CURRENT_ID++, username, title, progress });

    const insertedIndex = todos.findIndex(todo => todo.id === CURRENT_ID - 1)

    res.status(201).json(todos[insertedIndex]); // later no need value
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { username, title, progress } = req.body;

    todos.map(
        todo => todo.id === id ? { id, username, title, progress } : todo
    )

    const updatedIndex = todos.findIndex(todo => todo.id === id)

    res.status(200).json(todos[updatedIndex]); // later no need value
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    const deletedIndex = todos.findIndex(todo => todo.id === id)

    const result = todos[deletedIndex];

    todos = todos.filter(
        todo => todo.id !== id
    )

    res.status(200).json(result); // later no need value
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };