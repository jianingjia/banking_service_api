const mysql = require('mysql2');
require('dotenv').config();

//database connection setup
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


connection.connect((err) => {
  if (!err) {
      console.log('Connected to database');
    } else {
        console.log('Connection Failed')
    }
  
});

module.exports = { connection }