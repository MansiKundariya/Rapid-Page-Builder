const cron = require('node-cron');
const Blog = require('../models/blog');
const nodemailer = require('nodemailer');

const sendMail = async (user, userEmail, message, url) => {
    console.log(userEmail);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "mk.ptl2612@gmail.com",
            pass: "oqvn yzod eulm blks"
        }
    });

    const mailOptions = {
        from: {
            name: "Rapid page builder",
            address: "mk.ptl2612@gmail.com"
        },
        to: userEmail,
        subject: "Send email using nodemail",
        text: "", // This should be empty if you're sending HTML email
        html: ` <div>
                    <h3>Rapid Page Builder</h3>
                    <p style="font-size: 20px;">Hello, <strong>${user}</strong></p>
                    <p>${message}. You can view it by clicking on the following link:</p>
                    <a href="http://localhost:3001/${url}">LINK_TO_BLOG</a>
                </div>`,
        contentType: 'text/html', // Set content type to HTML

        // cc: []
        /*
         attachments: [
            {
                fileName: 'test.pdf',
                path: "your path",
                contentType:'application/pdf'
            }
        ] 
        */
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email has been send!");
    } catch (error) {
        console.log("Error while sending email : ", error);
    }
}

const updateBlogStatus = async () => {
    try {

        // const _currentTime = moment();
        const scheduledBlogs = await Blog.find({ status: "Scheduled" });
        // const scheduledBlogs = await Blog.find({ status: "Scheduled", publishDateAndTime: { $lte : _currentTime } });

        const currentTime = new Date();

        scheduledBlogs.forEach(async (blog) => {

            console.log(blog.url)

            const BlogTime = blog.publishDateAndTime;
            console.log(currentTime, BlogTime);

            if (currentTime.getFullYear() === BlogTime.getFullYear() && currentTime.getMonth() === BlogTime.getMonth() && currentTime.getDate() === BlogTime.getDate() && currentTime.getHours() === BlogTime.getHours() && currentTime.getMinutes() === BlogTime.getMinutes()) {

                // publish on github

                await Blog.findByIdAndUpdate(blog._id, { status: "Published" });
                console.log(`Blog "${blog.title}" published!`);

                console.log(blog.creatorEmail);
                sendMail(blog.createdBy, blog.creatorEmail, `Your blog "${blog.title}" has been published.`, blog.url);
            }

            // const oneHourBefore = new Date(blog.publishDateAndTime.getTime() - 60 * 60 * 1000);
            // if (currentTime.getTime() === oneHourBefore.getTime()) {
            if (currentTime.getFullYear() === BlogTime.getFullYear() && currentTime.getMonth() === BlogTime.getMonth() && currentTime.getDate() === BlogTime.getDate() && currentTime.getHours() === BlogTime.getHours() && currentTime.getMinutes() === BlogTime.getMinutes() - 1) {
                // Send email to user
                console.log(blog.creatorEmail);
                sendMail(blog.createdBy, blog.creatorEmail, `Your blog "${blog.title}" will be published in one minute.`, blog.url);
            }
        })
    } catch (error) {
        console.error("Error updating blog status:", error);
    }
};

// Schedule the task to run every minute
cron.schedule('* * * * *', () => {
    console.log('Running blog scheduler...');
    updateBlogStatus();
});

module.exports = updateBlogStatus;