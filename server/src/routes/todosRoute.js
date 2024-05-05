const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth');

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todosController");

router.get('/:username', authenticate, getTodos);
router.post('/', authenticate, createTodo);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;