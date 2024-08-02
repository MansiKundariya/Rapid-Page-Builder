require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database"); 
const cron = require("./routes/sendmail.js");

const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const blogRoutes = require("./routes/blog.js");

// middleware to handle file uploads
const fileUpload = require("express-fileupload");

// database connection
connection();

//middleware
app.use(express.json()); // transfer data into json format
app.use(cors());

app.use(fileUpload({
    useTempFiles: true
}))

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server runnig on port ${port}`);
})