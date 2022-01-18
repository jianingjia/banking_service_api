const {connection} = require('../helpers/database.js');
const {logger} = require('../helpers/logger');


function userLoginDao (clientCardNumber, password, result) {

    const sqlQuery = `SELECT * FROM BANKING_SERVICE.USER WHERE CLIENTCARDNUMBER = ${clientCardNumber}`;
  
    connection.query(sqlQuery, function(e, data) {
        // if query gives error
        if (e) {
          logger.info('error: ', e);
          result(e, null);
          return;
        }
  
        // if client has been found 
        if ((data.length) && (data[0].clientCardNumber === clientCardNumber) && (data[0].password === password)) {
          logger.info('Login successful');
          result(null, data[0]);
          return;
        }
  
        // client not found
        if (Object.keys(data).length == 0) {
          logger.info('user not found');
          result({ kind: 'not_found' }, null);
          return;
        }
  
        // Credentials incorrect
        logger.info('unauthorized');
        result({ kind: 'unauthorized' }, null);
      });
  };

  module.exports = {userLoginDao};