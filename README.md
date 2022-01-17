# banking_service_api


Welcome to the Banking Service API

This microservice allows users to log into their banking service, create, query, and delete accounts, as well as transactions to be created and queried within the accounts. 

These data has been stored in mySql database, as there is clear structural one-to-many relationship between the entities. 

Based on the requirements, some attributes has been added to the original model as foreign keys are necessary to refernce the information in another table. 
Modifications are as follows:

- clientCardNumber in the BANKING_SERVICE.ACCOUNT table is a foreign key referring clientCardNumber in BANKING_SERVICE.USER
- accountNumber in the BANKING_SERVICE.TRANSACTION table is a foreign key referring accountNumber in BANKING_SERVICE.ACCOUNT
- transactionNumber in the BANKING_SERVICE.TRANSACTION table is the unique identifier (primary key) for the table


Logical assumptions has also been made in the process of development listed as follows:


- 