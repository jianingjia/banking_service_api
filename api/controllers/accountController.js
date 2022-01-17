const { system } = require('faker');
const accountDao = require('../dao/accountDao');
const account = require('../model/account')

const newAccountController = (req, res) => {

    var { name, type } = req.body;
    const clientCardNumber = Number(req.swagger.params.clientCardNumber.value);
    name = String(name);
    type = String(type);

    // validate request
    if (Object.keys(req.body).length == 0) {
        res.send({
            status: 400,
            message: "Content can not be empty!"
        });
        return;
    }
    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.send({
            status: 400,
            message: "Client card number must be 16 digits!"
        });
        return;
    }

    if (!name) {
        res.send({
            status: 400,
            message: "Account name can not be empty!"
        });
        return;
    }
    if (!type) {
        res.send({
            status: 400,
            message: "Account type can not be empty!"
        });
        return;
    }
    if (type != 'SAVING' && type != 'CHEQUING') {
        res.send({
            status: 400,
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
        accountDao.createAccountDao(newAccount, (e, data) => {
            if (data) {
                res.send({
                    status: 200,
                    message: 'Account created successfully'
                });
                return;
            }
            else {
                res.send({
                    status: 500,
                    message: 'Something went wrong creating the account'
                });
                return;
            }
        });
    } catch (e) {
        res.send({
            status: 500,
            message:
                e.message || 'Something went wrong creating the account.'
        });

    }
}


const accountListController = (req, res) => {

    const clientCardNumber = Number(req.swagger.params.clientCardNumber.value);

    // validate request

    if (clientCardNumber < 1000000000000000 || clientCardNumber > 9999999999999999) {
        res.send({
            status: 400,
            message: "Client card number must be 16 digits!"
        });
        return;
    }


    // function call to account model class with error handling
    try {
        accountDao.accountListDao(clientCardNumber, (e, data) => {
            if (data) {
                res.status(200).send(data);
                return;
            }

            if (e.kind == 'resource_not_available') {
                res.send({
                    status: 404,
                    message: 'There is no account to display.'
                });
                return;
            }

            else {
                res.send({
                    status: 500,
                    message:
                        e.message || 'Something went wrong retrieving the accounts.'
                });
                return;
            }
        });
    } catch (e) {
        res.send({
            status: 500,
            message:
                e.message || 'Something went wrong retrieving the accounts.'
        });

    }
}


const updateAccountNameController = (req, res) => {

    var { name } = req.body;
    const accountNumber = Number(req.swagger.params.accountNumber.value);
    name = String(name);

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

    // function call to account model class with error handling
    try {
        accountDao.updateAccountNameDao(accountNumber, name, (e, data) => {
            if (data) {
                res.send({
                    status: 200,
                    message: 'Account name updated successfully'
                });
                return;
            }
            if (e.kind = 'not_found') {
                res.send({
                    status: 404,
                    message: 'Account does not exist.'
                });
                return;
            }
            else {
                res.send({
                    status: 500,
                    message: 'Something went wrong updating the account'
                });
                return;
            }
        });
    } catch (e) {
        res.status(500).send({
            status: 500,
            message:
                e.message || 'Something went wrong updating the account.'
        });

    }
}


const deleteAccountController = (req, res) => {

    const accountNumber = Number(req.swagger.params.accountNumber.value);

    // validate request

    if (accountNumber < 1000000 || accountNumber > 9999999) {
        res.send({
            status: 400,
            message: "Account number must be 7 digits!"
        });
        return;
    }

    // function call to account model class with error handling
    try {
        accountDao.deleteAccountDao(accountNumber, (e, data) => {
            if (data) {
                res.send({
                    status: 200,
                    message: 'Account deleted successfully'
                });
                return;
            }
            if (e.kind = 'not_found') {
                res.send({
                    status: 404,
                    message: 'Account does not exist.'
                });
                return;
            }
            else {
                res.send({
                    status: 500,
                    message: 'Something went wrong deleting the account'
                });
                return;
            }
        });
    } catch (e) {
        res.send({
            status: 500,
            message:
                e.message || 'Something went wrong deleting the account.'
        });

    }
}


module.exports = {
    newAccountController, accountListController,
    updateAccountNameController, deleteAccountController
}