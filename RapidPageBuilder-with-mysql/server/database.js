import mysql from 'mysql2/promise';

// Connection pools help reduce the time spent connecting to the MySQL server by reusing a previous connection, leaving them open instead of closing when you are done with them.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'mansi.patel',
    password: 'Mansi@2002',
    database: 'RapidPageBuilder'
})

export default pool;

// try {
//     // const [rows, fields] = await pool.query('INSERT INTO users (firstName, lastName, email, password) VALUES ("aary", "patel", "aary@gmail.com", "1122");');
//     const [rows, fields] = await pool.query('SELECT * FROM users');
//     console.log(rows, fields);
// } catch (error) {
//     console.log(error);
// }
/*

//Using connection...
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'mansi.patel',
    password: "Mansi@2002",
    database: 'RapidPageBuilder'
});

try {
    const [result, fields] = await connection.query(
        'SELECT * from users'
    );

    console.log(result);
    console.log(fields);
} catch (error) {
    console.log(error);
}
*/

