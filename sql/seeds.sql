USE employeeDB;

INSERT INTO department (Department_Name) VALUES ("Human Resources");
INSERT INTO department (Department_Name) VALUES ("Marketing");
INSERT INTO department (Department_Name) VALUES ("Information Technology");

INSERT INTO role (Title, Salary, Department_ID) VALUES ("Analyst", 70, 3);
INSERT INTO role (Title, Salary, Department_ID) VALUES ("Communications Associate", 50, 2);
INSERT INTO role (Title, Salary, Department_ID) VALUES ("Social Media Manager", 50, 2);

INSERT INTO employee (First_Name, last_name, Role_ID) VALUES ("Ashley", "Rodriquez", 2);
INSERT INTO employee (First_Name, last_name, Role_ID) VALUES ("Abby", "Whiteman", 1);
INSERT INTO employee (First_Name, last_name, Role_ID) VALUES ("Katie", "Pieto", 3);