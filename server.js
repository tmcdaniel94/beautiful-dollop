const inquirer = require('inquirer');
const pool = require('./config/connection')

pool.connect(err => {
    if (err) throw err;
    console.log('Connected to database!');
    employeeDB();
});

const employeeDB = function () {
inquirer
  .prompt([
    { 
      type: 'list',
      name: 'prompt',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add an employee',
        'Update an employee role'
      ]}
  ]).then((answers) => {
    if (answers.prompt === 'View all departments') {
        pool.query('SELECT * FROM department', (err, result) => {
            if (err) throw err;
            console.log("Viewing all departments: ");
            console.table(result.rows);
            employeeDB();
        });
    } else if (answers.prompt === 'View all roles') {
        pool.query('SELECT * FROM roles', (err, result) => {
            if (err) throw err;
            console.log("Viewing all roles: ");
            console.table(result.rows);
            employeeDB();
        });
    } else if (answers.prompt === 'View all employees') {
        pool.query('SELECT * FROM employee', (err, result) => {
            if (err) throw err;
            console.log("Viewing all employees: ");
            console.table(result.rows);
            employeeDB();
        });
    } else if (answers.prompt === 'Add a department') {
        inquirer.prompt([
            { 
              type: 'input',
              name: 'department',
              message: 'Input the name of the department',
              validate: addDepartment => {
                if (addDepartment) {
                    return true;
                } else {
                    console.log('Please input a department');
                    return false;
                }
              }
            }]).then((answers) => {
                pool.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) =>{
                    if (err) throw err;
                    console.log(`${answers.department} added to the database`)
                    employeeDB();
                });
        })
    } else if (answers.prompt === 'Add a role') {
        pool.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Input the name of the role',
                    validate: addRoleName => {
                        if (addRoleName) {
                            return true;
                        } else {
                            console.log('Input name of the role');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Input the salary of the role',
                    validate: addSalary => {
                        if (addSalary) {
                            return true;
                        } else {
                            console.log('Input the role salary');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Choose the department the role belongs to',
                    choices: () => {
                        const departmentChoicesArray = [];
                        for (var i = 0; i < result.length; i++) {
                            departmentChoicesArray.push(result[i].name);
                        }
                        return departmentChoicesArray;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].name === answers.department) {
                        var department = result[i];
                    }
                }

                pool.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`${answers.role} added to the database`)
                    employeeDB();
                });
            })
        });
    } else if (answers.prompt === 'Add an employee') {
        
    }
    }
  });
};
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });