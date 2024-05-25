const todos = [
    { id: 1, username: "john", title: "task1", progress: 50},
    { id: 2, username: "john", title: "task2", progress: 0},
    { id: 3, username: "ya", title: "task3", progress: 100},
];

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

    try {
        const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
        const ret = await pool.query(query, [title, progress, id]);
        res.json(ret.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
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
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };