const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_db',
    password: 'batman'
});

module.exports = sequelize;