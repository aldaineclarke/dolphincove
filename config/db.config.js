const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.SECRET_KEY,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
});


module.exports = db;