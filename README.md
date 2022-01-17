# banking_service_api


Welcome to the Banking Service API

Here is the swagger link to the service: http://localhost:4000/swagger

This microservice allows users to log into their banking service, create, query, and delete accounts, as well as transactions to be created and queried within the accounts. 

These data has been stored in mySql database, as there is clear structural one-to-many relationship between the entities. 

Based on the requirements, some attributes has been added to the original model for identification and referencing purposes. 
Modifications are as follow:

- clientCardNumber in the BANKING_SERVICE.ACCOUNT table as a foreign key 
- accountNumber in the BANKING_SERVICE.TRANSACTION table as a foreign key
- transactionNumber in the BANKING_SERVICE.TRANSACTION table as the unique identifier (primary key)


Logical assumptions has also been made in the process of development, listed as follow:

- the starting balance of an account is defaulted to $0
- clientCardNumber (16 digits), accountNumber (7 digits), and transactionNumber (8 digits) are system generated
- account type is one of 'CHEQUING' or 'SAVING'
- the transaction date is automatically retrieved from the system
- the creation of a new transaction adds to the balance of the account
