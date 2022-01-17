CREATE DATABASE BANKING_SERVICE;

create table BANKING_SERVICE.USER(
	clientCardNumber BIGINT NOT NULL auto_increment,
    password varchar(32) NOT NULL,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    dateOfBirth date NOT NULL,
    primary key (clientCardNumber)
    );
    
ALTER TABLE BANKING_SERVICE.USER AUTO_INCREMENT = 1000000000000000;
DROP TABLE BANKING_SERVICE.USER;
select * from BANKING_SERVICE.USER where clientCardNumber = 1000000000000000;

insert into banking_service.user (password, firstname, lastname, dateOfBirth)
values ("testuser1", "John", "Doe", "1990-01-01");

create table BANKING_SERVICE.ACCOUNT(
	clientCardNumber BIGINT NOT NULL,
    ACCOUNTNUMBER INT NOT NULL auto_increment,
    Name varchar(50) NOT NULL,
    TYPE SET('CHEQUING','SAVING') NOT NULL,
    BALANCE FLOAT(2) NOT NULL,
    FOREIGN key (clientCardNumber) REFERENCES BANKING_SERVICE.USER(CLIENTCARDNUMBER),
    PRIMARY KEY (ACCOUNTNUMBER)
    );
    
ALTER TABLE BANKING_SERVICE.ACCOUNT AUTO_INCREMENT = 1000000;

DROP TABLE BANKING_SERVICE.ACCOUNT;


create table BANKING_SERVICE.TRANSACTION(
    ACCOUNTNUMBER INT NOT NULL,
    TRANSACTIONNUMBER INT NOT NULL auto_increment,
    Name varchar(50) NOT NULL,
    DATE date NOT NULL,
    AMOUNT FLOAT(2) NOT NULL,
    FOREIGN key (ACCOUNTNUMBER) REFERENCES BANKING_SERVICE.ACCOUNT(ACCOUNTNUMBER),
    PRIMARY KEY (TRANSACTIONNUMBER)
    );
    
ALTER TABLE BANKING_SERVICE.TRANSACTION AUTO_INCREMENT = 10000000;
    
DROP TABLE BANKING_SERVICE.TRANSACTION;