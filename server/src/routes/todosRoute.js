const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require("../controllers/todosController");

const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        res.sendStatus(401);
    }
}

router.get('/:username', authenticate, getTodos);
router.post('/', authenticate, createTodo);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;