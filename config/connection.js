const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_db',
    password: 'batman'
});


async function fetchRoles() {
    try {
        const { rows } = await pool.query('SELECT * FROM roles');
        const rolesArray = results.map(row => row.title);
        return rolesArray;
    } catch (err) {
        console.error('Error querying database: ', err);
        return [];
    }
};
fetchRoles();


module.exports = { pool, fetchRoles };