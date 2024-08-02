const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: false },
    subtitle: { type: String, required: false },
    body: { type: String, required: false },
    attachment: { type: String, required: false },
    createdBy: { type: String, required: false },
    creatorEmail: { type: String, required: false },
    createdAt: { type: Date, required: false },
    modifiedBy: { type: String, required: false },
    modifiedAt: { type: Date, required: false },
    status: { type: String, required: false },
    url: { type: String, required: false },
    publishDateAndTime: { type: Date, required: false}
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;