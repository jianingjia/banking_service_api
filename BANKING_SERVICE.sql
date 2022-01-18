show databases;
use heroku_0280152eaafb006;

select * from user;
create table USER(
	clientCardNumber BIGINT NOT NULL auto_increment,
    password varchar(32) NOT NULL,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    dateOfBirth date NOT NULL,
    primary key (clientCardNumber)
    );
    
ALTER TABLE USER AUTO_INCREMENT = 1000000000000000;
DROP TABLE USER;
select * from USER;

insert into user (password, firstname, lastname, dateOfBirth)
values ("testuser1", "John", "Doe", "1990-01-01");

insert into user (password, firstname, lastname, dateOfBirth)
values ("testuser2", "Jane", "Doe", "1990-01-01");

create table ACCOUNT(
	clientCardNumber BIGINT NOT NULL,
    ACCOUNTNUMBER INT NOT NULL auto_increment,
    Name varchar(50) NOT NULL,
    TYPE SET('CHEQUING','SAVING') NOT NULL,
    BALANCE FLOAT(2) NOT NULL,
    FOREIGN key (clientCardNumber) REFERENCES USER(CLIENTCARDNUMBER),
    PRIMARY KEY (ACCOUNTNUMBER)
    );
    
ALTER TABLE ACCOUNT AUTO_INCREMENT = 1000000;
select * from account;
DROP TABLE ACCOUNT;


create table TRANSACTION(
    ACCOUNTNUMBER INT NOT NULL,
    TRANSACTIONNUMBER INT NOT NULL auto_increment,
    Name varchar(50) NOT NULL,
    DATE date NOT NULL,
    AMOUNT FLOAT(2) NOT NULL,
    FOREIGN key (ACCOUNTNUMBER) REFERENCES ACCOUNT(ACCOUNTNUMBER),
    PRIMARY KEY (TRANSACTIONNUMBER)
    );
    
ALTER TABLE TRANSACTION AUTO_INCREMENT = 10000000;
select * from TRANSACTION;
DROP TABLE TRANSACTION;