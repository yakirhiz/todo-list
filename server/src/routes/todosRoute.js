const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth');

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todosControllerInMemory");

router.use('/', (req, res, next) => {
    console.log(`Handling todo request...`);
    next();
});

router.get('/:username', authenticate, getTodos);
router.post('/', authenticate, createTodo);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;