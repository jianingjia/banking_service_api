const { connection } = require('../helpers/database.js');

function createTransactionDao(newTransaction, result) {
    connection.query("INSERT INTO BANKING_SERVICE.TRANSACTION (accountNumber, name, amount) VALUES (?,?,?)",
        [newTransaction.accountNumber, newTransaction.name, newTransaction.amount], function (e, data) {
            // if query gives error
            if (e) {
                console.log('error: ', e);
                result(e, null);
                return;
            }

            // if transaction has been created
            // to update account balance
            connection.query("UPDATE BANKING_SERVICE.ACCOUNT SET balance = balance + ? WHERE accountNumber = ?",
                [newTransaction.amount, newTransaction.accountNumber], function (e2, data2) {
                    // if query gives error
                    if (e2) {
                        console.log('error: ', e2);
                        result(e2, null);
                        return;
                    }

                    // if balance has been updated
                    console.log('Transaction created successfully');

                });
            console.log('Transaction created successfully');
            result(null, data);
        });

};

function transactionListDao(accountNumber, result) {

    const sqlQuery = `SELECT * FROM BANKING_SERVICE.TRANSACTION WHERE accountNumber = ${accountNumber}`;

    connection.query(sqlQuery, function (e, data) {
        // if query gives error
        if (e) {
            console.log('error: ', e);
            result(e, null);
            return;
        }

        // if transactions has been retrieved
        if (data.length) {
            console.log('Transactions retrieved successfully');
            result(null, data);
            return;
        }

        // no transaction to display
        if (!data.length) {
            console.log('There is no transaction to display');
            result({ kind: 'resource_not_available' }, null);
            return;
        }

        // Internal Error
        console.log('Something went wrong retrieving the transactions');
        result({ kind: 'internal_server_error' }, null);
    });
};

module.exports = { createTransactionDao, transactionListDao }