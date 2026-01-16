const { Pool } = require('pg');

const pool =  new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect((error) => {
    if (error) {
        console.log("Error", error.stack);
    } else {
        console.log("Tudo o");
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};