const router = require('express').Router();

/* Routing */
router.use('/users', require('./routes/userRoute'));
router.use('/todos', require('./routes/todoRoute'));

module.exports = router;