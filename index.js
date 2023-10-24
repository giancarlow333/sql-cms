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
    }
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
]

// Function to initialize the application
function init () {
    inquirer.prompt(questions).then((response) => {
        //console.log(response);
        if (response.choices = "view all departments") {
            console.log("chose \"view all departments\"");
            viewAllDepartments();
        }
        else {console.log("chose something else");}
        return;
    });
}

// Initialize the application
init();

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        return;
    });
}