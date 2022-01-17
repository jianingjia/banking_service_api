

/**
 * transaction object
 * @param {number} accountNumber
 * @param {number} transactionNumber
 * @param {string} name
 * @param {date} date
 * @param {float} amount
 * @returns {void}
 */


function Transaction(accountNumber, transactionNumber, name, date, amount) {
    this.accountNumber = accountNumber;
    this.transactionNumber = transactionNumber;
    this.name = name;
    this.date = date;
    this.amount = amount;
};


module.exports = Transaction;