CREATE DATABASE RapidPageBuilder;
USE RapidPageBuilder;

CREATE TABLE users (id integer PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(20) NOT NULL, lastName VARCHAR(20) NOT NULL, email VARCHAR(30) NOT NULL, password VARCHAR(10) NOT NULL);

CREATE TABLE blog (id integer PRIMARY KEY AUTO_INCREMENT, 
title VARCHAR(20) NOT NULL, subtitle VARCHAR(40) NOT NULL, body VARCHAR(100) NOT NULL, attachment VARCHAR(30) NOT NULL, createdBy integer NOT NULL, createdAt date NOT NULL, modifiedBy integer, modifiedAt date, status VARCHAR(10) NOT NULL, url VARCHAR(20) NOT NULL, publishDateAndTime date,  FOREIGN KEY (createdBy) REFERENCES users(id), FOREIGN KEY (modifiedBy) REFERENCES users(id));