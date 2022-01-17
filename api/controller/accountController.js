const account = require('../model/account');

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


module.exports = { newAccountController, accountListController,
    updateAccountNameController, deleteAccountController
}