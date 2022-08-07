const env = require("dotenv");
env.config();
const mysql = require("mysql2");
const con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
});

module.exports = con;