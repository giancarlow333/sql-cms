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
        //console.log("response: ", response);
        //console.log("response.newDept: ", response.newDept);
        await db.promise().query(`INSERT INTO department (name) VALUES ("${response.newDept}")`).then( (results) => {
            console.log(results[0]);
        });
    });
    mainMenu(); // return to main menu
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
    ]).then(async function (response) {
        //console.log("response: ", response);
        await db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.newRole}", ${response.newSalary}, ${response.newDept})`).then( (results) => {
            console.log(results[0]);
        });
    });
    mainMenu(); // return to main menu
}