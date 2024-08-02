import pool from '../database.js';
import jwt from 'jsonwebtoken';

export default function loginHandler(req, res) {
    let requestBody = '';
    req.on('data', (chunk) => {
        requestBody += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const currentuser = JSON.parse(requestBody);
            const users = await pool.query('SELECT * FROM users');

            const user = users[0].find((user) => {
                return user.email === currentuser.email;
            })

            if (!user) {
                return res.end(JSON.stringify({ message: "Invalid email" }));
            }

            if (currentuser.password !== user.password) {
                return res.end(JSON.stringify({ message: "Invalid passowrd" }));
            }

            const _token = jwt.sign({ id: user.id }, process.env.JWTPRIVATEKEY);

            const responseData = {
                token: _token,
                id: user.id,
                message: "LogedIn successfully!"
            }

            res.writeHead(200, {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            });
            res.end(JSON.stringify(responseData));

        } catch (error) {
            console.log(error);
        }
    });
}