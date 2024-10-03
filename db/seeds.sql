INSERT INTO department ( name )
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles ( title, salary, department_id )
VALUES ('Sales Lead', '100000', 4);

INSERT INTO employee ( first_name, last_name, role_id, manager_id )
VALUES ('rob', 'bery', 4, 1);