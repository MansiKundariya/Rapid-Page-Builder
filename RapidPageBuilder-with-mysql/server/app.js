import http from "http";
import url from "url";
// import pool from './database.js';
import registerHandler from './routes/register.js';
import loginHandler from './routes/login.js';
import getUserById from './routes/user.js';
import { addBlogHandler, deleteBlogById, getAllBlogs, updateBlogById } from './routes/blog.js';
import dotenv from 'dotenv';
dotenv.config();


// req, res are stream objects.
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    const { method, headers } = req;
    const overriddenMethod = headers['x-http-method-override'];
    if (overriddenMethod) {
        req.method = overriddenMethod.toUpperCase();
    }

    console.log(req.method);
    
    console.log(req.method, pathname);

    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Length': '0'
        });
        res.end();
        return;
    }

    if (req.method === 'POST' && pathname === '/api') registerHandler(req, res);
    else if (req.method === 'POST' && pathname === '/api/login') loginHandler(req, res);
    else if (req.method === 'GET' && pathname.startsWith('/api/user/')) {
        const userId = pathname.split('/').pop();
        // console.log(userId);
        getUserById(userId, res);
    }
    else if (req.method === 'POST' && pathname === '/api/blog') addBlogHandler(req, res);
    else if (req.method === 'GET' && pathname === '/api/blog') getAllBlogs(req, res);
    else if (req.method === 'DELETE' && pathname.startsWith('/api/blog/')) {
        const userId = pathname.split('/').pop();
        // console.log(userId);
        deleteBlogById(userId, res);
    }
    else if (req.method === 'PUT' && pathname.startsWith('/api/blog/')) {
        console.log(pathname);
        const userId = pathname.split('/').pop();
        console.log(userId);
        updateBlogById(userId, res);
    }
    else console.log("end");
});

server.listen(8000, () => {
    console.log('Server started on localhost:8000!');
});
