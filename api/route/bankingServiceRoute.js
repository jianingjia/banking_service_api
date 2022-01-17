const userController = require('../controller/userController');
const accountController = require ('../controller/accountController');
const transactionController = require('../controller/transactionController');
const express = require('express');


const router = express.Router();


// log in with client card number and password
router.put('/user', userController.userLoginController);

// create new account for a user    
router.post('/user/:clientCardNumber/accounts', accountController.newAccountController);

// retrieve a list of user's accounts
router.get('/user/:clientCardNumber/accounts', accountController.accountListController);

// update the name of an account  
router.put('/accounts/:accountNumber', accountController.updateAccountNameController);

// delete an account
router.delete('/accounts/:accountNumber', accountController.deleteAccountController);

// create a transaction on an account
router.post('/accounts/:accountNumber/transactions', transactionController.createTransactionController);

// list all of the transactions of an account
router.get('/accounts/:accountNumber/transactions', transactionController.transactionListController);

// list all of the transactions of an account between given dates
// router.post('/accounts/:accountId/transactions', bankingServiceController.transactionDateFilterController);

module.exports = router;