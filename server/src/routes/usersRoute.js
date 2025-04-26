const express = require('express');
const router = express.Router();
const { authenticate } = require('../auth');

const { signup, login, updateUser, deleteUser } = require('../controllers/usersControllerInMemory')

router.use('/', (req, res, next) => {
    console.log(`Handling user request...`);
    next();
});

router.post('/signup', signup);
router.post('/login', login);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;