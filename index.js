// Include packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

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

// User input questions
const questions = [
    {
        type: 'list',
        message: 'Please choose from the following options:',
        name: 'initialChoice',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
    }
]

// Function to initialize the application
function init () {
    inquirer.prompt(questions).then((response) => {
        //console.log(response);
        if (response.choices = "view all departments") {
            console.log("chose \"view all departments\"");
            viewAllDepartments();
        }
        console.log("chose something else");
    });
}

// Initialize the application
init();

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
}