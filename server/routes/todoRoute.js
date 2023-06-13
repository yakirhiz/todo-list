const express = require('express');
const router = express.Router();

let todos = [
    { id: "0", username: "yakir", title: "Eat breakfast", progress: 0 }, 
    { id: "1", username: "john", title: "Eat lunch", progress: 50  }, 
    { id: "2", username: "yakir", title: "Eat dinner", progress: 90  },
    { id: "3", username: "yakir", title: "Finish the project", progress: 90  },
    { id: "4", username: "john", title: "Clean my room", progress: 90  }
];

let index = todos.length;

router.get('/:username', (req, res) => {
    const { username } = req.params;
    ret = todos.filter(item => item.username === username);
    res.json(ret);
})

/* Maybe change the return value from the following routes */
router.post('/', (req, res) => {
    const { username, title, progress } = req.body;
    let id = `${index}`;
    todos.push({ id, username, title, progress });
    index++;

    console.log(todos)
    res.json(todos);
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { username, title, progress } = req.body;
    todos = todos.map((item) => item.id === id ? { id, username, title, progress } : item);

    res.json(todos);
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(item => item.id !== id);

    res.json(todos);
})

module.exports = router;