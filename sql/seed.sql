USE employeedb;

INSERT INTO department (Department_Name) VALUES ("Human Resources");
INSERT INTO department (Department_Name) VALUES ("Marketing");
INSERT INTO department (Department_Name) VALUES ("Information Technology");
INSERT INTO department (Department_Name) VALUES ("Corporate");

INSERT INTO role (Title, Salary, Department_ID) VALUES ("Analyst", 70, 3);
INSERT INTO role (Title, Salary, Department_ID) VALUES ("Communications Associate", 50, 2);
INSERT INTO role (Title, Salary, Department_ID) VALUES ("Social Media Manager", 50, 2);
INSERT INTO role (Title, Salary, Department_ID) VALUES ("Director", 100, 1);
INSERT INTO role (Title, Salary, Department_ID) VALUES ("Director", 100, 4);

INSERT INTO employee (First_Name, Last_Name, Role_ID) VALUES ("David", "Jester", 2);
INSERT INTO employee (First_Name, Last_Name, Role_ID) VALUES ("Abby", "Whiteman", 1);
INSERT INTO employee (First_Name, Last_Name, Role_ID) VALUES ("Katie", "Pieto", 3);
INSERT INTO employee (First_Name, Last_Name, Role_ID) VALUES ("Rachael", "Squirm", 4);
INSERT INTO employee (First_Name, Last_Name, Role_ID) VALUES ("Lizzie", "Halep", 5);