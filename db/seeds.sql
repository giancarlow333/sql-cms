USE employee_db;

INSERT INTO department
    (name)
VALUES
    ("Research"),
    ("Engineering"),
    ("Accounting"),
    ("Corporate");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Senior Researcher", 500000, 1),
    ("Junior Researcher", 200000, 1),
    ("Senior Engineer", 500000, 2),
    ("Junior Engineer", 200000, 2),
    ("Accounts Manager", 500000, 3),
    ("Accountant", 200000, 3),
    ("Chief Executive Officer", 1000000, 4),
    ("Senior Vice President", 500000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Emmett", "Brown", 7, NULL),
    ("Martin", "McFly", 8, 1),
    ("Nikola", "Tesla", 1, 2),
    ("Wayne", "Zelinsky", 3, 2),
    ("John", "Doe", 5, 2),
    ("Jennifer", "Parker", 2, 3),
    ("Montgomery", "Scott", 2, 3),
    ("Anthony", "Stark", 4, 4),
    ("Peter", "Parker", 4, 4),
    ("Richard", "Roe", 6, 5),
    ("Jane", "Ho", 6, 5);