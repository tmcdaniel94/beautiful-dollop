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
            console.table(result);
            employeeDB();
        });
    } else if (answers.prompt === 'View all roles') {
        pool.query('SELECT * FROM roles', (err, result) => {
            if (err) throw err;
            console.log("Viewing all roles: ");
            console.table(result);
            employeeDB();
        });
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