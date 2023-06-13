const Pool = require('pg').Pool;

require('dotenv').config();

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "todos",
    user: "postgres",
    password: "postgres"
});

module.exports = pool;