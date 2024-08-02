import pool from '../database.js';
import multiparty from "multiparty";

async function getAllBlogs(req, res) {

    let blogs = await pool.query('SELECT * FROM blog');
    blogs = blogs[0];
    // console.log(blogs);

    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(blogs));
}

function addBlogHandler(req, res) {
    console.log("Add...");
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to add blog data" }));
            return;
        }

        const title = fields.title[0];
        const subtitle = fields.subtitle[0];
        const body = fields.body[0];
        // const attachment = files.attachment[0].path;
        const url = fields.url[0];
        const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');;
        const createdBy = fields.createdBy[0];
        const status = fields.status[0];
        // const modifiedAt = fields.modifiedAt ? fields.modifiedAt[0] : null;
        // const modifiedBy = fields.modifiedBy ? fields.modifiedBy[0] : null;
        // const publishDateAndTime = fields.publishDateAndTime ? fields.publishDateAndTime[0] : null;

        // console.log(title, subtitle, body, url, createdBy, createdAt, status);

        const result = pool.query(
            `INSERT INTO blog (title, subtitle, body, url, createdBy, createdAt, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, subtitle, body, url, createdBy, createdAt, status]
        );

        res.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end(JSON.stringify({ message: "Blog added successfully" }));
    });
}

function updateBlogById(userId, req, res) {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to add blog data" }));
            return;
        }

        const title = fields.title[0];
        const subtitle = fields.subtitle[0];
        const body = fields.body[0];
        // const attachment = files.attachment[0].path;
        const url = fields.url[0];
        const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');;
        const createdBy = fields.createdBy[0];
        const status = fields.status[0];
        const modifiedAt = fields.modifiedAt ? fields.modifiedAt[0] : null;
        const modifiedBy = fields.modifiedBy ? fields.modifiedBy[0] : null;
        // const publishDateAndTime = fields.publishDateAndTime ? fields.publishDateAndTime[0] : null;

        // console.log(title, subtitle, body, url, createdBy, createdAt, status);

        const result = pool.query(
            `UPDATE blog SET title=${title}, subtitle=${subtitle}, body=${body}, url=${url}, createdBy=${createdBy}, createdAt=${createdAt}, modifiedBy=${modifiedBy}, modifiedAt=${modifiedAt}, status=${status} WHERE id=${userId}`);

        res.writeHead(200, {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end(JSON.stringify({ message: "Blog updated successfully" }));
    })
}

async function deleteBlogById(userId, res) {
    const blog = await pool.query(`DELETE FROM blog WHERE id=${userId};`);
    console.log(blog);

    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify({ message: "Blog deleted successfully!" }));
}

export { getAllBlogs, addBlogHandler, updateBlogById, deleteBlogById };