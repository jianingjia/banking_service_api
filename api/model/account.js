

/**
 * account object
 * @param {number} clientCardNumber
 * @param {number} accountNumber
 * @param {string} name
 * @param {string} type
 * @param {double} balance
 * @returns {void}
 */


function Account(clientCardNumber, accountNumber, name, type, balance) {
    this.clientCardNumber = clientCardNumber;
    this.accountNumber = accountNumber;
    this.name = name;
    this.type = type;
    this.balance = balance;
}




module.exports = Account;