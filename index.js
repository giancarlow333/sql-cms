// Include packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`)
);
/*db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
}); //https://www.w3schools.com/nodejs/nodejs_mysql.asp */

// User input questions
const questions = [
    {
        type: 'list',
        message: 'Please choose from the following options:',
        name: 'initialChoice',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit'],
    }
];

// Function to initialize the application
function init () {
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
init();

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
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
    databaseClose(db); // close the database connection
}

// VIEW ALL ROLES
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
    });
    databaseClose(db); // close the database connection
}

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
    });
    databaseClose(db); // close the database connection
}

// ADD A DEPARTMENT
async function addDepartment() {
    await inquirer.prompt([{ type: 'input', message: 'What is the name of the department?', name: 'newDept', }]).then((response) => {
        console.log("response: ", response);
        console.log("response.newDept: ", response.newDept);
        db.query(`INSERT INTO department (name) VALUES ("${response.newDept}")`, function (err, results) {
            console.log(results);
            if (err) {
                console.log(err);
            }
        });
    });
    databaseClose(db); // close the database connection
}

// ADD A ROLE
async function addRole() {
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
            type: 'input',
            message: 'What is its department? (use id)',
            name: 'newDept',
        },
    ]).then((response) => {
        console.log("response: ", response);
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.newRole}", ${response.newSalary}, ${response.newDept})`, function (err, results) {
            console.log(results);
            if (err) {
                console.log(err);
            }
        });
    });
    databaseClose(db); // close the database connection
}