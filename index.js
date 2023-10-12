// Include packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// User input questions
const questions = [
    {
        type: 'input',
        message: 'What is the name of your project?',
        name: 'projname',
    }
]

// Function to initialize the application
function init () {
    inquirer.prompt(questions).then((response) => {
        console.log(response);
    });
}

// Initialize the application
init();