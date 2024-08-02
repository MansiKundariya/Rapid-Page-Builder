const router = require("express").Router();
const Blog = require("../models/blog");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dsg1jso9u',
    api_key: '588875183148816',
    api_secret: 'vO9UiblQhk43YaMI9hH05UnQTQQ'
});

router.post("/", async (req, res) => {
    try {

        console.log(req.body);

        const file = req.files.attachment; // Assuming you're using a middleware like multer to handle file uploads

        // Upload file to Cloudinary
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            if (err) {
                console.error("Error uploading to Cloudinary:", err);
                return res.status(500).send({ message: "Error uploading file." });
            }

            const newBlog = new Blog({
                title: req.body.title,
                subtitle: req.body.subtitle,
                body: req.body.body,
                attachment: result.url,
                createdBy: req.body.createdBy,
                creatorEmail: req.body.creatorEmail,
                createdAt: req.body.createdAt,
                modifiedBy: req.body.modifiedBy,
                modifiedAt: req.body.modifiedAt,
                status: req.body.status,
                url: req.body.url,
                publishDateAndTime: `${req.body.publishDate}T${req.body.publishTime}:00`
            }).save();
        })
        
        res.status(201).send({ message: "Blog uploaded successfully!" });

    } catch (error) {

        console.log(error);
        return res.status(409).send({ message: "Error accures" });
    }
})

router.get("/", async (req, res) => {
    try {

        Blog.find({}).then(data => {
            res.json(data);
        }).catch(error => {
            res.status(408).json({ error });
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: "Internal server error" });
    }
})

router.get("/publishblog", async (req, res) => {
    try {

        const blog = await Blog.find({ status: "Published" });
        console.log(blog);
        
        if (blog === null) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: "Internal server error" });
    }
});

router.get("/:url", async (req, res) => {
    try {
        const _url = req.params.url; // Retrieve the URL parameter from the request

        // Find the blog with the matching URL
        const blog = await Blog.findOne({ url: _url });
        console.log(blog);

        if (blog === null) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog); // Send the found blog as JSON response
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {

        console.log(req.params.id, req.body);
        const updatedItem = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(updatedItem);
        res.status(201).send({ message: "Blog updated successfully!" });

    } catch (error) {

        console.log(error.message);
        return res.status(409).send({ message: "Error accures" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log("delete", req.body);
        const deletedItem = await Blog.findByIdAndDelete(req.params.id);
        console.log(deletedItem);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;