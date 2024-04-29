const express = require('express');
const router = express.Router();

const usersRoute = require('./routes/usersRoute');
const todosRoute = require('./routes/todosRoute');

router.use('/users', usersRoute);
router.use('/todos', todosRoute);

module.exports = router;