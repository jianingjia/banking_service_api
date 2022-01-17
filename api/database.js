const mysql = require('mysql2');

//database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'bankingService',
    password: 'testuser',
    database: 'BANKING_SERVICE',
});

connection.connect((err) => {
  if (!err) {
      console.log('Connected to database');
    } else {
        console.log('Connection Failed')
    }
  
});

module.exports = { connection }