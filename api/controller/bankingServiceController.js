const user = require('../model/user');
const account = require('../model/account');
const transaction = require('../model/transaction');

const userLoginController = (req, res) => {

    const { clientCardNumber, password } = req.body;

    // Validate request
    if (Object.keys(req.body).length == 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (!clientCardNumber) {
        res.status(400).send({
            message: "Client Card Number can not be empty!"
        });
        return;
    }

    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.status(400).send({
            message: "Client card number must be 16 digits!"
        });
        return;
    }

    if (!password) {
        res.status(400).send({
            message: "Password can not be empty!"
        });
        return;
    }

    // function call to user model class with error handling
    try {
        user.userLogin(clientCardNumber, password, (e, data) => {
            if (data) {
                res.status(200).send({
                    message: 'Login successful'
                });
                return;
            }
            if (e.kind === 'not_found') {
                res.status(404).send({
                    message: 'User not found.'
                });
                return;
            }
            if (e.kind === 'unauthorized') {
                res.status(401).send({
                    message: 'Credential incorrect.'
                });
                return;
            } else {
                res.status(500).send({
                    message:
                        e.message || 'Some error occurred while logging in.'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Some error occurred while logging in.'
        });

    }
}


const newAccountController = (req, res) => {

    var {name, type} = req.body;
    const clientCardNumber = Number(req.params.clientCardNumber);
    name = String(name);
    type = String(type);

    // validate request
    if (Object.keys(req.body).length == 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.status(400).send({
            message: "Client card number must be 16 digits!"
        });
        return;
    }

    if (!name) {
        res.status(400).send({
            message: "Account name can not be empty!"
        });
        return;
    }
    if (!type) {
        res.status(400).send({
            message: "Account type can not be empty!"
        });
        return;
    }
    if (type != 'SAVING' && type != 'CHEQUING') {
        res.status(400).send({
            message: "Account type must be one of SAVING or CHEQUING!"
        });
        return;
    }

    // creating a new account object
    const newAccount = new account();
    newAccount.clientCardNumber = clientCardNumber;
    newAccount.name = name;
    newAccount.type = type;

    // function call to account model class with error handling
    try {
        account.createAccount(newAccount, (e, data) => {
            if (data) {
                res.status(200).send({
                    message: 'Account created successfully'
                });
                return;
            }
            else {
                res.status(500).send({
                    message: 'Something went wrong creating the account'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Something went wrong creating the account.'
        });

    }
}


const accountListController = (req, res) => {

    const clientCardNumber = Number(req.params.clientCardNumber);

    // validate request

    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.status(400).send({
            message: "Client card number must be 16 digits!"
        });
        return;
    }
   

    // function call to account model class with error handling
    try {
        account.accountList(clientCardNumber, (e, data) => {
            if (data) {
                res.status(200).send(data);
                return;
            }

            if (e.kind == 'resource_not_available') {
                res.status(200).send({
                    message: 'There is no account to display.'
                });
                return;
            }

            else {
                res.status(500).send({
                    message:
                        e.message || 'Something went wrong retrieving the accounts.'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Something went wrong retrieving the accounts.'
        });

    }
}


const updateAccountNameController = (req, res) => {

    var { name } = req.body;
    const accountNumber = Number(req.params.accountNumber);
    name = String(name);

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

    // function call to account model class with error handling
    try {
        account.updateAccountName(accountNumber, name, (e, data) => {
            if (data) {
                res.status(200).send({
                    message: 'Account name updated successfully'
                });
                return;
            }
            if (e.kind = 'not_found') {
                res.status(200).send({
                    message: 'Account does not exist.'
                });
                return;
            }
            else {
                res.status(500).send({
                    message: 'Something went wrong updating the account'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Something went wrong updating the account.'
        });

    }
}


const deleteAccountController = (req, res) => {

    const accountNumber = Number(req.params.accountNumber);

    // validate request
    
    if (accountNumber < 1000000 || accountNumber > 9999999) {
        res.status(400).send({
            message: "Account number must be 7 digits!"
        });
        return;
    }

    // function call to account model class with error handling
    try {
        account.deleteAccount(accountNumber, (e, data) => {
            if (data) {
                res.status(200).send({
                    message: 'Account deleted successfully'
                });
                return;
            }
            if (e.kind = 'not_found') {
                res.status(200).send({
                    message: 'Account does not exist.'
                });
                return;
            }
            else {
                res.status(500).send({
                    message: 'Something went wrong deleting the account'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            message:
                e.message || 'Something went wrong deleting the account.'
        });

    }
}


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


module.exports = {
    userLoginController, newAccountController, accountListController,
    updateAccountNameController, deleteAccountController,
    createTransactionController, transactionListController
}