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
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    }
];

// Function to initialize the application
function init () {
    inquirer.prompt(questions).then((response) => {
        console.log(response);
        chooser(response.initialChoice);
        db.end(); // close the database connection
    });
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
        default:
            console.log("chose something else");
    }
};

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        return;
    });
}

// VIEW ALL ROLES
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        return;
    });
}

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
        return;
    });
}