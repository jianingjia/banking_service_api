
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


module.exports = User;