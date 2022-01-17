
const { connection } = require('../database.js')

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


Account.createAccount = (newAccount, result) => {

    connection.query("INSERT INTO BANKING_SERVICE.ACCOUNT (clientCardNumber, name, type) VALUES (?,?,?)",
        [newAccount.clientCardNumber, newAccount.name, newAccount.type], function (e, data) {
            // if query gives error
            if (e) {
                console.log('error: ', e);
                result(e, null);
                return;
            }

            // if account has been created
            console.log('Account created successfully');
            result(null, data);
        });
};

Account.accountList = (clientCardNumber, result) => {

    const sqlQuery = `SELECT * FROM BANKING_SERVICE.ACCOUNT WHERE clientCardNumber = ${clientCardNumber}`;

    connection.query(sqlQuery, function (e, data) {
        // if query gives error
        if (e) {
            console.log('error: ', e);
            result(e, null);
            return;
        }

        // if account has been retrieved
        if (data.length) {
            console.log('Accounts retrieved successfully');
            result(null, data);
            return;
        }

        // no accounts to display
        if (!data.length) {
            console.log('There is no account to display');
            result({ kind: 'resource_not_available' }, null);
            return;
        }

        // Internal Error
        console.log('Something went wrong retrieving the accounts');
        result({ kind: 'internal_server_error' }, null);
    });
};

Account.updateAccountName = (accountNumber, name, result) => {
    connection.query("UPDATE BANKING_SERVICE.ACCOUNT SET name = ? WHERE accountNumber = ?",
        [name, accountNumber], function (e, data) {
            // if query gives error
            if (e) {
                console.log('error: ', e);
                result(e, null);
                return;
            }

            //account not found
            if (data.affectedRows == 0) {
                console.log('Account not found');
                result({ kind: 'not_found' }, null);
                return;
            }

            // if account has been updated
            console.log('Account name has been updated successfully');
            result(null, data);
        });
};

Account.deleteAccount = (accountNumber, result) => {
    connection.query("DELETE FROM BANKING_SERVICE.ACCOUNT WHERE accountNumber = ?",
        accountNumber, function (e, data) {
            // if query gives error
            if (e) {
                console.log('error: ', e);
                result(e, null);
                return;
            }

            //account not found
            if (data.affectedRows == 0) {
                console.log('Account not found');
                result({ kind: 'not_found' }, null);
                return;
            }

            // if account has been DELETED
            console.log('Account has been deleted successfully');
            result(null, data);
        });
};

module.exports = Account;