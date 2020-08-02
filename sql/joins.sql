USE employeeDB;

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

-- View All Employees --
SELECT employee.ID, employee.First_Name, employee.Last_Name, role.Title, dept.Department_Name AS department, 
role.Salary, CONCAT(manager.First_Name, ' ', manager.Last_Name) AS manager FROM employee 
LEFT JOIN role on employee.Role_ID = role.ID 
LEFT JOIN department dept on role.Department_ID = dept.id 
LEFT JOIN employee manager on manager.id = employee.Manager_ID;

-- View All Departments --
SELECT department.id, Department_Name AS department FROM department;

-- View All Employees By Role Id --
SELECT employee.id, employee.First_Name, employee.Last_Name, role.Title, dept.Department_Name AS department, 
role.salary, CONCAT(manager.First_Name, ' ', manager.Last_Name) AS manager FROM employee 
LEFT JOIN role on employee.Role_ID = role.id 
LEFT JOIN department dept on role.Department_ID = dept.id 
LEFT JOIN employee manager on manager.id = employee.Manager_ID
WHERE role.id = 2;

-- View All Employees by Department Id --
SELECT employee.id, employee.First_Name, employee.Last_Name, role.Title, dept.Department_Name AS department, 
role.Salary, CONCAT(manager.First_Name, ' ', manager.Last_Name) AS manager FROM employee 
LEFT JOIN role on employee.Role_ID = role.id 
LEFT JOIN department dept on role.Department_ID = dept.id 
LEFT JOIN employee manager on manager.id = employee.Manager_ID
WHERE dept.id = 11;

-- View All Employees By Manager ID --
SELECT employee.id, employee.First_Name, employee.Last_Name, role.Title, dept.Department_Name AS department, 
role.salary, CONCAT(manager.First_Name, ' ', manager.Last_Name) AS manager FROM employee 
LEFT JOIN role on employee.Role_ID = role.id 
LEFT JOIN department dept on role.department_id = dept.id 
LEFT JOIN employee manager on manager.id = employee.Manager_ID
WHERE manager.id = 1;

-- View All Managers --
SELECT DISTINCT employee.Manager_ID AS Manager_ID, CONCAT(manager.First_Name, ' ', manager.Last_Name) AS manager FROM employee 
LEFT JOIN employee manager on manager.id = employee.Manager_ID
WHERE employee.Manager_ID IS NOT NULL;

-- View All Employees By Manager Name --
SELECT employee.id, employee.First_Name, employee.Last_Name, role.Title, dept.Department_Name AS department, 
role.Salary, CONCAT(manager.First_Name, ' ', manager.Last_Name) AS manager FROM employee 
LEFT JOIN role on employee.Role_ID = role.id 
LEFT JOIN department dept on role.Department_ID = dept.id 
LEFT JOIN employee manager on manager.id = employee.Manager_ID
WHERE manager.First_Name = 'Ashley' AND manager.Last_Name = 'Rodriguez';