const { connection } = require('../helpers/database.js');

function createAccountDao(newAccount, result) {

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

function accountListDao(clientCardNumber, result) {

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

function updateAccountNameDao(accountNumber, name, result) {
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

function deleteAccountDao(accountNumber, result) {
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

module.exports = { createAccountDao, updateAccountNameDao, accountListDao, deleteAccountDao }