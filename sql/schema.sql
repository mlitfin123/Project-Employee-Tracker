CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    Department_Name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    Title VARCHAR(30) NOT NULL,
    Salary DECIMAL NOT NULL,
    Department_ID INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    First_Name VARCHAR(30) NOT NULL,
    Last_Name varchar(30) NOT NULL,
    Role_ID INT,
    Manager_ID INT,
    PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;