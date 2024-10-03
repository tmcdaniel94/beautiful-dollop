const inquirer = require('inquirer');
const sequelize = require('./config/connection')

sequelize.connect();

inquirer
  .prompt([

    { 
      type: 'list',
      message: 'What would you like to do?',
      name: 'home',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ])
  .then((answers) => {
    if (answers.home === 'View all departments') {
        return (sequelize)
    }
    console.log(answers);
  });
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });