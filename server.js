const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    multipleStatements: true, 
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "SoccerLiberty2006!",
    database: "employeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Remove Employee",
            "Remove Department",
            "Remove Role",
            "Update Employee Role",
            "Exit"
        ]
    })
    .then(function(answer) {
        if (answer.action === 'View all Employees') {
            viewEmployees();
        } else if (answer.action === 'View all Roles') {
            viewRoles();
        } else if (answer.action === 'View all Departments') {
            viewDepartments();
        } else if (answer.action === 'Add a Department') {
            addDepartment();
        } else if (answer.action === 'Add a Role') {
            addRole();
        } else if (answer.action === 'Add an Employee') {
            addEmployee();
        } else if (answer.action === 'Remove Employee') {
            removeEmployee();
        } else if (answer.action === 'Remove Department') {
            removeDepartment();
        } else if (answer.action === 'Remove Role') {
            removeRole();
        } else if (answer.action === 'Update Employee Role') {
            updateRole();
        }
        else if (answer.action === 'Exit') {
            connection.end();
        }
    })
    }
    
    function viewEmployees() {
        var query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            if (err) throw (err);
            console.table(`Employees:`, res)
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
        .then(function (answer) {
            if (answer.action === 'Back to the Start?') {
                start();
            }
            else if (answer.action === 'Exit') {
                connection.end();
            }
        })
        });
    };
        
    function viewDepartments() {
        var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
            if (err) throw (err);
            console.table(`DEPARTMENTS:`, res)
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
        .then(function (answer) {
            if (answer.action === 'Back to the Start?') {
                start();
            }
            else if (answer.action === 'Exit') {
                connection.end();
            }
        })
        });
    };
    
    function viewRoles() {
        var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
            if (err) throw (err);
            console.table(`Roles:`, res)
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
        .then(function (answer) {
            if (answer.action === 'Back to the Start?') {
                start();
            }
            else if (answer.action === 'Exit') {
                connection.end();
            }
        })
        });
    };
    
    function addDepartment() {
        inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
        })
        .then(function(answer) {
        var query = "INSERT INTO department (Department_Name) VALUES ( ? )";
        connection.query(query, answer.department, function(err, res) {
            if (err) throw (err);
            console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
        .then(function (answer) {
            if (answer.action === 'Back to the Start?') {
                start();
            }
            else if (answer.action === 'Exit') {
                connection.end();
            }
        })
        })
    })
    }
    
    async function addRole() {
        let deptList = [];
        let dept_id;
        var query = "SELECT Department_Name FROM department";
        connection.query(query, function(err, res) {
            //console.log(res);
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var a = (res[i].Department_Name);
                deptList.push(a);
            }
            //console.log(deptList);
            return deptList;
        });
        inquirer
        .prompt([{
            name: "role",
            type: "input",
            message: "What is the title of the new role?"
        }, 
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
        },
        {
            name: 'dept',
            type: 'list',
            message: "Which department does this role belong to?",
            choices: deptList
        }
        ]) 

        .then(function(answers) {
            let { role, salary, dept } = answers;
            query = `SELECT id FROM department WHERE Department_Name = "${dept}"`;

            role = ('"' + role + '"').trim();
            dept = (dept).trim();
            salary = (salary).trim();
            connection.query(query, function(err, res) {
        
            if (err) throw (err);
            dept_id = res[0].id;

            if (dept_id === undefined) {
                console.log("The department you entered was not found.")
                addRole();
            }
            values = [role, salary, dept_id];

            connection.query(`INSERT INTO role (Title, Salary, Department_ID) VALUES (${values})`);

            console.log(`You have added this role: ${(answers.role).toUpperCase()}.`)
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
        .then(function (answers) {
            if (answers.action === 'Back to the Start?') {
                start();
            }
            else if (answers.action === 'Exit') {
                connection.end();
            }
        })
        });
});
}

    async function addEmployee() {
        let roleList = [];
        let managersList = ["N/A"];
        let role_id;
        let manager_id;
        var roleQuery = "SELECT * FROM role";
        var employeeQuery = "SELECT * FROM employee";
        connection.query(roleQuery, function(err, res) {
            //console.log(res);
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var a = res[i].Title;
                roleList.push(a);
            }
            //console.log(roleList);
            return roleList;
        });
        connection.query(employeeQuery, function(err, res) {
            //console.log(res);
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var a = res[i].Last_Name;
                managersList.push(a);
            }
            //console.log(managersList);
            return managersList;
        });
        inquirer
            .prompt([{
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?",
            }, 
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                name: "roleName",
                type: "list",
                message: "What role does the employee have?",
                choices: roleList
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who is this employee\'s manager?',
                choices: managersList
            }
        ]) 

    .then(function(answers) {
        let { firstName, lastName, roleName, manager } = answers;
        query = `SELECT id FROM role WHERE Title = "${roleName}"`;

        firstName = ('"' + firstName + '"').trim();
        lastName = ('"' + lastName + '"').trim();
        roleName = roleName;
        manager = ('"' + manager + '"');
        connection.query(query, async function(err, res) {

        if (err) throw (err);
        role_id = res[0].id;
        //console.log(role_id);

        if (manager != 'N/A') {

            var query = `SELECT id FROM employee WHERE Last_Name = ${manager}`;

            connection.query(query, function (err, res) {

                if (err) throw err;
                manager_id = res[0].id;
            });

        }
        else {
            manager_id = 'N/A';
        }
        await new Promise(resolve => setTimeout(resolve, 200));

        values = [firstName, lastName, role_id, manager_id];
        console.log(values);

        connection.query(`INSERT INTO employee (First_Name, Last_Name, Role_ID, Manager_ID) VALUES (${values})`);
        if (err) throw (err);
        console.log(`You have added the employee: ${(answers.firstName).toUpperCase()} ${(answers.lastName).toUpperCase()}`)
        inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Back to the Start?",
                "Exit"
            ]
        })
        .then(function (answers) {
            if (answers.action === 'Back to the Start?') {
                start();
            }
            else if (answers.action === 'Exit') {
                connection.end();
            }
        })
        });
        });
    }

    async function removeEmployee(){
        let employeeList = [];
        const query = "SELECT * FROM employee";
        connection.query(query, function (err, res) {
            //console.log(res);
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var a = res[i].First_Name;
                var b = res[i].Last_Name;
                var empName = `${a} ${b}`;
                employeeList.push(empName);
            };
            //console.log(employeeList);
            return employeeList;
        });
        await new Promise(resolve => setTimeout(resolve, 200));
        inquirer
        .prompt(
            {
                type: 'list',
                name: 'employee',
                message: 'Select the employee you want to remove from the database.',
                choices: employeeList
            }
        )
        .then(function(answer){
            const employee = answer.employee;

            var firstName = ('"' + employee.split(" ")[0] + '"');
            var lastName = ('"' + employee.split(" ")[1] + '"');
            console.log(firstName);
            console.log(lastName);

            const query = `DELETE FROM employee WHERE First_Name = ${firstName} AND Last_Name = ${lastName}`;
            connection.query(query, function (err, res) {
                console.log(`The employee ${employee} was deleted successfully`)
                if (err) {
                    console.log(`The employee ${employee} could not be deleted`);
                    throw err;
                }
            })
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
            .then(function (answers) {
                if (answers.action === 'Back to the Start?') {
                    start();
                }
                else if (answers.action === 'Exit') {
                    connection.end();
                }
            })
        })
    };

    async function removeDepartment(){
        let deptList = [];
        const query = "SELECT * FROM department";
        connection.query(query, function (err, res) {
            //console.log(res);
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var a = res[i].Department_Name;
                deptList.push(a);
            };
            console.log(deptList);
            return deptList;
        });
        await new Promise(resolve => setTimeout(resolve, 200));
        inquirer
        .prompt(
            {
                type: 'list',
                name: 'department',
                message: 'Select the department you want to remove from the database.',
                choices: deptList
            }
        )
        .then(function(answer){
            const department = ('"' + answer.department + '"');

            const query = `DELETE FROM department WHERE Department_Name = ${department}`;
            connection.query(query, function (err, res) {
                console.log(`The department ${department} was deleted successfully`)
                if (err) {
                    console.log(`The department ${department} could not be deleted`);
                    throw err;
                }
            })
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
            .then(function (answers) {
                if (answers.action === 'Back to the Start?') {
                    start();
                }
                else if (answers.action === 'Exit') {
                    connection.end();
                }
            })
        })
    }

    async function removeRole(){
        let roleList = [];
        const query = "SELECT * FROM role";
        connection.query(query, function (err, res) {
            //console.log(res);
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                var a = res[i].Title;
                roleList.push(a);
            };
            console.log(roleList);
            return roleList;
        });
        await new Promise(resolve => setTimeout(resolve, 200));
        inquirer
        .prompt(
            {
                type: 'list',
                name: 'role',
                message: 'Select the role you want to remove from the database.',
                choices: roleList
            }
        )
        .then(function(answer){
            const role = ('"' + answer.role + '"');

            const query = `DELETE FROM role WHERE Title = ${role}`;
            connection.query(query, function (err, res) {
                console.log(`The role ${role} was deleted successfully`)
                if (err) {
                    console.log(`The role ${role} could not be deleted`);
                    throw err;
                }
            })
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Back to the Start?",
                    "Exit"
                ]
            })
            .then(function (answers) {
                if (answers.action === 'Back to the Start?') {
                    start();
                }
                else if (answers.action === 'Exit') {
                    connection.end();
                }
            })
        })
    
    }

    function updateRole() {


    }