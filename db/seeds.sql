INSERT INTO department ( name )
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles ( title, salary, department_id )
VALUES ('Sales Lead', '100000', 4),
       ('Salesperson', '30000', 4),
       ('Lead Engineer', '200000', 1),
       ('Accountant', '90000', 2),
       ('Legal Team Lead', '250000', 3),
       ('Lawyer', '120000', 3);

INSERT INTO employee ( first_name, last_name, role_id, manager_id )
VALUES ('Robert', 'Berry', 4, 1),
       ('Emily', 'Smith', 2, 1),
       ('Mateo', 'Sanchez', 1, null),
       ('Rachel', 'Martinez', 3, null),
       ('Lindsey', 'Burton', 5, null)
       ('Marina', 'Ingalls', 6, 5);