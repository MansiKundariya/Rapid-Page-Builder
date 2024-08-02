import pool from '../database.js';

export default function handleLoginRequest(req, res) {

    let requestBody = '';

    req.on('data', (chunk) => {
        console.log("Data:", chunk);
        requestBody += chunk.toString();
    });


    req.on('end', async () => {
        try {
            const currentuser = JSON.parse(requestBody);
            delete currentuser.confirmPassword;

            const users = await pool.query('SELECT email FROM users');

            const user = users[0].find((user) => {
                return user.email === currentuser.email;
            })

            if (user) {
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000', // Allow requests from the frontend origin
                    'Access-Control-Allow-Methods': 'POST', // Allow POST requests
                });
                res.end(JSON.stringify({ message: "User already exists!" }));
                return;
            }

            const [rows, fields] = await pool.query(`INSERT INTO users SET ?`, currentuser);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "User registered successfully" }));

        } catch (error) {
            console.log(error);
        }
    });
}