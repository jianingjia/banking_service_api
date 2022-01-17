
const transaction = require('../model/transaction');
const transactionDao = require('../dao/transactionDao');

const createTransactionController = (req, res) => {

    var { name, amount } = req.body;
    const accountNumber = Number(req.swagger.params.accountNumber.value);
    name = String(name);
    amount = parseFloat(amount);

    // validate request
    if (Object.keys(req.body).length == 0) {
        res.send({
            status: 400,
            message: "Content can not be empty!"
        });
        return;
    }

    if (accountNumber < 1000000 || accountNumber > 9999999) {
        res.send({
            status: 400,
            message: "Account number must be 7 digits!"
        });
        return;
    }

    if (!name) {
        res.send({
            status: 400,
            message: "Transaction name can not be empty!"
        });
        return;
    }
    if (!amount) {
        res.send({
            status: 400,
            message: "Transaction amount can not be empty!"
        });
        return;
    }


    // creating a new transaction object
    const newTransaction = new transaction();
    newTransaction.accountNumber = accountNumber;
    newTransaction.name = name;
    newTransaction.amount = amount;

    // function call to transaction model class with error handling
    try {
        transactionDao.createTransactionDao(newTransaction, (e, data) => {
            if (data) {
                res.send({
                    status: 200,
                    message: 'Transaction created successfully'
                });
                return;
            }
            else {
                res.send({
                    status: 500,
                    message: 'Something went wrong creating the transaction'
                });
                return;
            }
        });
    } catch (e) {
        res.send({
            status: 500,
            message:
                e.message || 'Something went wrong creating the transaction.'
        });

    }
}

const transactionListController = (req, res) => {

    const accountNumber = Number(req.swagger.params.accountNumber.value);

    // validate request

    if (accountNumber < 1000000 || accountNumber > 9999999) {
        res.send({
            status: 400,
            message: "Account number must be 7 digits!"
        });
        return;
    }


    // function call to transaction model class with error handling
    try {
        transactionDao.transactionListDao(accountNumber, (e, data) => {
            if (data) {
                res.status(200).send(data);
                return;
            }

            if (e.kind == 'resource_not_available') {
                res.send({
                    status: 404,
                    message: 'There is no transaction to display.'
                });
                return;
            }

            else {
                res.send({
                    status: 500,
                    message:
                        e.message || 'Something went wrong retrieving the transaction.'
                });
                return;
            }
        });
    } catch (e) {
        res.send({
            status: 500,
            message:
                e.message || 'Something went wrong retrieving the transaction.'
        });

    }
}

module.exports = { createTransactionController, transactionListController }