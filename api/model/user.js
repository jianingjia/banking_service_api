const {connection} = require('../database.js')


/**
 * user object
 * @param {number} clientCardNumber
 * @param {string} password
 * @param {string} firstName
 * @param {string} lastName
 * @param {date} dateOfBirth
 * @returns {void}
 */


 function User(clientCardNumber, password, firstName, lastName, dateOfBirth)  {
  this.clientCardNumber = clientCardNumber;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.dateOfBirth = dateOfBirth;
}


User.userLogin = (clientCardNumber, password, result) => {

  const sqlQuery = `SELECT * FROM BANKING_SERVICE.USER WHERE CLIENTCARDNUMBER = ${clientCardNumber}`;

  connection.query(sqlQuery, function(e, data) {
      // if query gives error
      if (e) {
        console.log('error: ', e);
        result(e, null);
        return;
      }

      // if client has been found 
      if ((data.length) && (data[0].clientCardNumber === clientCardNumber) && (data[0].password === password)) {
        console.log('Login successful');
        result(null, data[0]);
        return;
      }

      // client not found
      if (Object.keys(data).length == 0) {
        console.log('user not found');
        result({ kind: 'not_found' }, null);
        return;
      }

      // Credentials incorrect
      console.log('unauthorized');
      result({ kind: 'unauthorized' }, null);
    });
};

module.exports = User;