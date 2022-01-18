const { connection } = require('../helpers/database.js');
const {logger} = require('../helpers/logger');

function createTransactionDao(newTransaction, result) {
    connection.query("INSERT INTO BANKING_SERVICE.TRANSACTION (accountNumber, name, amount) VALUES (?,?,?)",
        [newTransaction.accountNumber, newTransaction.name, newTransaction.amount], function (e, data) {
            // if query gives error
            if (e) {
                logger.info('error: ', e);
                result(e, null);
                return;
            }

            // if transaction has been created
            // to update account balance
            connection.query("UPDATE BANKING_SERVICE.ACCOUNT SET balance = balance + ? WHERE accountNumber = ?",
                [newTransaction.amount, newTransaction.accountNumber], function (e2, data2) {
                    // if query gives error
                    if (e2) {
                        logger.info('error: ', e2);
                        result(e2, null);
                        return;
                    }

                    // if balance has been updated
                    logger.info('Transaction created successfully');

                });
            logger.info('Transaction created successfully');
            result(null, data);
        });

};

function transactionListDao(accountNumber, result) {

    const sqlQuery = `SELECT * FROM BANKING_SERVICE.TRANSACTION WHERE accountNumber = ${accountNumber}`;

    connection.query(sqlQuery, function (e, data) {
        // if query gives error
        if (e) {
            logger.info('error: ', e);
            result(e, null);
            return;
        }

        // if transactions has been retrieved
        if (data.length) {
            logger.info('Transactions retrieved successfully');
            result(null, data);
            return;
        }

        // no transaction to display
        if (!data.length) {
            logger.info('There is no transaction to display');
            result({ kind: 'resource_not_available' }, null);
            return;
        }

        // Internal Error
        logger.info('Something went wrong retrieving the transactions');
        result({ kind: 'internal_server_error' }, null);
    });
};

function transactionFilterByDateDao(accountNumber, start, end, result) {

    connection.query(`SELECT * FROM BANKING_SERVICE.TRANSACTION WHERE accountNumber = ?
    AND ? <= date AND ? >= date ORDER BY date ASC`, 
    [accountNumber, start, end], function (e, data) {

        // if query gives error
        if (e) {
            logger.info('error: ', e);
            result(e, null);
            return;
        }

        // if transactions has been retrieved
        if (data.length) {
            logger.info('Transactions retrieved successfully');
            result(null, data);
            return;
        }

        // no transaction to display
        if (!data.length) {
            logger.info('There is no transaction to display');
            result({ kind: 'resource_not_available' }, null);
            return;
        }

        // Internal Error
        logger.info('Something went wrong retrieving the transactions');
        result({ kind: 'internal_server_error' }, null);
    });
};

module.exports = { createTransactionDao, transactionListDao, transactionFilterByDateDao }