import pool from '../database.js';

async function getUserById(userId, res) {
    let user = await pool.query(`SELECT * FROM users WHERE id=${userId}`);
    user = user[0][0];

    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(user));
}

export default getUserById;
