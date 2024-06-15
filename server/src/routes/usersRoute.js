const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/usersControllerInMemory')

router.use('/', (req, res, next) => {
    console.log(`Handling user request...`);
    next();
});

router.post('/signup', signup);
router.post('/login', login);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

module.exports = router;