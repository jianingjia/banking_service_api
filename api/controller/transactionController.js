
const transaction = require('../model/transaction');


const createTransactionController = (req, res) => {

    var {name, amount} = req.body;
    const accountNumber = Number(req.params.accountNumber);
    name = String(name);
    amount = parseFloat(amount);

    // validate request
    if (Object.keys(req.body).length == 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (accountNumber < 1000000 || accountNumber > 9999999) {
        res.status(400).send({
            message: "Account number must be 7 digits!"
        });
        return;
    }

    if (!name) {
        res.status(400).send({
            message: "Transaction name can not be empty!"
        });
        return;
    }
    if (!amount) {
        res.status(400).send({
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
        transaction.createTransaction(newTransaction, (e, data) => {
            if (data) {
                res.status(200).send({
                    message: 'Transaction created successfully'
                });
                return;
            }
            else {
                res.status(500).send({
                    message: 'Something went wrong creating the transaction'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Something went wrong creating the transaction.'
        });

    }
}

const transactionListController = (req, res) => {

    const accountNumber = Number(req.params.accountNumber);

    // validate request

    if (accountNumber < 1000000 || accountNumber > 9999999) {
        res.status(400).send({
            message: "Account number must be 7 digits!"
        });
        return;
    }
   

    // function call to transaction model class with error handling
    try {
        transaction.transactionList(accountNumber, (e, data) => {
            if (data) {
                res.status(200).send(data);
                return;
            }

            if (e.kind == 'resource_not_available') {
                res.status(200).send({
                    message: 'There is no transaction to display.'
                });
                return;
            }

            else {
                res.status(500).send({
                    message:
                        e.message || 'Something went wrong retrieving the transaction.'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Something went wrong retrieving the transaction.'
        });

    }
}

module.exports = {createTransactionController, transactionListController}