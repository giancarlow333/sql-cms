// Include packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createPool(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    },
    console.log(`Connected to the employee_db database.`)
);

// User input questions
const questions = [
    {
        type: 'list',
        message: 'Please choose from the following options:',
        name: 'initialChoice',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit'],
    }
];

// Main menu
function mainMenu () {
    inquirer.prompt(questions).then((response) => {
        console.log(response);
        chooser(response.initialChoice);
    });
};

// function to close the connection
function databaseClose(db) {
    db.end();
};

// Initialize the application
mainMenu();

// CHOOSER
function chooser(choice) {
    switch(choice) {
        case "view all departments":
            console.log("chose \"view all departments\"");
            viewAllDepartments();
            break;
        case "view all roles":
            viewAllRoles();
            break;
        case "view all employees":
            viewAllEmployees();
            break;
        case "add a department":
            addDepartment();
            break;
        case "add a role":
            addRole();
            break;
        case "add an employee":
            addEmployee();
            break;
        case "update an employee role":
            updateEmployeeRole();
            break;
        case "quit":
            databaseClose(db);
            break;
        default:
            console.log("chose something else");
    }
};

// VIEW ALL DEPARTMENTS
async function viewAllDepartments() {
    await db.promise().query('SELECT * FROM department').then( (results) => {
        console.log(results[0]);
    });
    mainMenu(); // return to main menu
}

// VIEW ALL ROLES
async function viewAllRoles() {
    await db.promise().query('SELECT * FROM role').then( (results) => {
        console.log(results[0]);
    });
    mainMenu(); // return to main menu
}

// VIEW ALL EMPLOYEES
async function viewAllEmployees() {
    await db.promise().query('SELECT * FROM employee').then( (results) =>  {
        console.log(results[0]);
    });
    mainMenu(); // return to main menu
}

// ADD A DEPARTMENT
async function addDepartment() {
    await inquirer.prompt([{ type: 'input', message: 'What is the name of the department?', name: 'newDept', }]).then(async function (response) {
        await db.promise().query(`INSERT INTO department (name) VALUES ("${response.newDept}")`).then( (results) => {
            console.log(results[0]);
        });
    });
    mainMenu(); // return to main menu
}

// ADD A ROLE
async function addRole() {
    let depts = [];
    await db.promise().query('SELECT * FROM department').then( (results) => {
        depts = results[0];
    });
    await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role?',
            name: 'newRole',
        },
        {
            type: 'input',
            message: 'What is its salary?',
            name: 'newSalary',
        },
        {
            type: 'list',
            message: 'What is its department? (use id)',
            name: 'newDept',
            choices: depts,
        },
    ]).then(async function (response) {
        let deptid = 0;
        for (let i = 0; i < depts.length; i++) {
            if (response.newDept == depts[i].name) {
                deptid = i + 1;
            }
        };
        await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.newRole}", ${response.newSalary}, ${deptid})`).then( (results) => {
            console.log(results[0]);
        });
    });
    mainMenu(); // return to main menu
}

// ADD AN EMPLOYEE
async function addEmployee() {
    // query db for all roles and employees
    let rolesResults = [];
    await db.promise().query('SELECT * FROM role').then( (results) => {
        rolesResults = results[0];
    });
    let otheremps = [];
    await db.promise().query('SELECT * FROM employee').then( (results) => {
        otheremps = results[0];
    });
    // Role strings
    let roles = [];
    for (let i = 0; i < rolesResults.length; i++) {
        roles.push({ name: rolesResults[i].title, value: i+1 });
    }
    // managers string, including NULL
    let managers = [ { name: "None", value: "NULL" } ];
    for (let i = 0; i < otheremps.length; i++) {
        let fullName = `${otheremps[i].first_name} ${otheremps[i].last_name}`;
        let valueToBe = i + 1;
        managers.push({ name: fullName, value: valueToBe });
    }
    //console.log("managers: ", managers);
    await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'newFirst',
        },
        {
            type: 'input',
            message: 'What is their last name?',
            name: 'newLast',
        },
        {
            type: 'list',
            message: 'What is their role?',
            name: 'newRole',
            choices: roles,
        },
        {
            type: 'list',
            message: 'Who is their manager?',
            name: 'newMgr',
            choices: managers,
        },
    ]).then(async function (response) {
        await db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.newFirst}", "${response.newLast}", ${response.newRole}, ${response.newMgr})`).then( (results) => {
            console.log(results[0]);
        });
    });
    mainMenu(); // return to main menu
}

// UPDATE EMPLOYEE ROLE
async function updateEmployeeRole() {
    // query db for all roles and employees
    let rolesResults = [];
    await db.promise().query('SELECT * FROM role').then( (results) => {
        rolesResults = results[0];
    });
    let otheremps = [];
    await db.promise().query('SELECT * FROM employee').then( (results) => {
        otheremps = results[0];
    });
    // Role strings
    let roles = [];
    for (let i = 0; i < rolesResults.length; i++) {
        roles.push({ name: rolesResults[i].title, value: i+1 });
    }
    // employees string, including NULL
    let employees = [ { name: "None", value: "NULL" } ];
    for (let i = 0; i < otheremps.length; i++) {
        let fullName = `${otheremps[i].first_name} ${otheremps[i].last_name}`;
        let valueToBe = i + 1;
        employees.push({ name: fullName, value: valueToBe });
    }
    //console.log("managers: ", managers);
    await inquirer.prompt([
        {
            type: 'list',
            message: 'What employee do you wish to update?',
            name: 'newEmp',
            choices: employees,
        },
        {
            type: 'list',
            message: 'What is their new role?',
            name: 'newRole',
            choices: roles,
        },
    ]).then(async function (response) {
        await db.promise().query(`UPDATE employee SET role_id = ${response.newRole} WHERE id = ${response.newEmp}`).then( (results) => {
            console.log(results[0]);
        });
    });
    mainMenu(); // return to main menu
}