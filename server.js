const inquirer = require('inquirer');
const { pool, fetchRoles } = require('./config/connection')

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
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Log out'
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
            }
            ]).then((answers) => {
                pool.query(`INSERT INTO department (name) VALUES ($1)`, [answers.department], (err, result) => {
                    if (err) {
                        console.log('Error inserting department: ', err);
                        return;
                    } 
                    console.log(`${answers.department} added to the database`)
                    employeeDB();
                });
        })
    } else if (answers.prompt === 'Add a role') {

        pool.query(`SELECT * FROM roles`, (err, result) => {

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
                    //     const departmentChoicesArray = [];
                    //     for (var i = 0; i < result.length; i++) {
                    //         departmentChoicesArray.push(result[i].name);
                    //     }
                    //     return departmentChoicesArray;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].name === answers.department) {
                        var department = result[i];
                    }
                }

                pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [answers.role, answers.salary, department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`${answers.role} added to the database`)
                    employeeDB();
                });
            })
        });
    } else if (answers.prompt === 'Add an employee') {

        pool.query(`SELECT * FROM roles`, (err, results) => {
            let resultsArray = results.rows.map(result => result.title)
            pool.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log('View all employees');
                console.table(result.rows);
    
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Input employee first name:',
                        validate: addFirstName => {
                            if (addFirstName) {
                                return true;
                            } else {
                                console.log('Input first name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Input employee last name:',
                        validate: addLastName => {
                            if (addLastName) {
                                return true;
                            } else {
                                console.log('Input last name');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Select employee role:',
                        choices: resultsArray
                    }, 
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Input the employees manager',
                        validate: addManager => {
                            if (addManager) {
                                return true;
                            } else {
                                console.log('Input manager');
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    let roleId = results.rows.filter(result => result.title == answers.role)[0].id;
                    pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.first_name, answers.last_name, roleId, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`${answers.first_name} ${answers.last_name} added to the database.`)
                        employeeDB();
                    });
                });
            });
    
        })

    } else if (answers.prompt === 'Update an employee role') {

        pool.query(`SELECT * FROM employee`, (err, result) => {
            let resultsArray = results.rows.map(result => result.title)

            pool.query(`SELECT * FROM roles`, (err, result) => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Choose an employee to update',
                        choices: resultsArray
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Select a new role for the employee',
                        choices: () => {
                            const array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                        }
                            const roleArray = [...new Set(array)];
                            return roleArray;
                        }
                    }
                ]).then((answers) => {
                    let roleId = results.rows.filter(result => result.title == answers.role)[0].id;
                    pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.first_name, answers.last_name, roleId, answers.manager.id], (err, result) => {

                    // for (var i = 0; i < result.length; i++) {
                    //     if (result[i].last_name === answers.employee) {
                    //         var name = result[i];
                    //     }
                    // }
    
                    // for (var i = 0; i < result.length; i++) {
                    //     if (result[i].title === answers.role) {
                    //         var role = result[i];
                    //     }
                    // }
                    pool.query(`UPDATE employee SET ? WHERE ?`,  [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) throw err;
                        console.log(`${answers.employee} has been updated`);
                        employeeDB();
                    });
                });
            });
        })
    })
    } else if (answers.prompt === 'Log out') {
        pool.end();
        console.log('Logged out');
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