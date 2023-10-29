```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

SCHEMA ERRORS:
https://stackoverflow.com/questions/13257815/key-column-doesnt-exist-in-table-when-trying-to-define-foreign-key
* PRIMARY KEY autoincrement error: https://stackoverflow.com/questions/25865104/field-id-doesnt-have-a-default-value

* Add value: https://stackoverflow.com/questions/65415706/how-to-get-index-value-of-choice-made-with-inquirer
Console.Table: https://developer.mozilla.org/en-US/docs/Web/API/console/table;
padend: https://stackoverflow.com/questions/19837697/node-js-formatted-console-output
Self join https://www.mysqltutorial.org/mysql-self-join/, https://www.w3schools.com/mysql/mysql_join_self.asp