// Include packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
            console.log("view all departments");
        }
    });
}

// Initialize the application
init();

// VIEW ALL DEPARTMENTS
function viewAllDepartments() {

}