const router = require("express").Router();
const User = require("../models/user");
// const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.find({ email: req.body.email });

        for (let letter of req.body.firstName) {
            if (!isNaN(letter)) {
                return res.status(400).send({ message: "Enter valid Firstname." })
            }
        }

        for (let letter of req.body.lastName) {
            if (!isNaN(letter)) {
                return res.status(400).send({ message: "Enter valid Lastname." })
            }
        }

        //user.length
        if (user.length) {
            return res.status(400).send({ message: "User with given email already exist!" })
        }


        if (req.body.password.length < 4) {
            return res.status(400).send({ message: "Password must be at least 4 characters long." })
        }

        // const salt = bcrypt.genSalt(process.env.SALT);
        // const hashPassword = bcrypt.hash(req.body.password, salt);
        await new User({ ...req.body }).save();
        res.status(201).send({ message: "User created successfully!" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal server error" })
    }
})

router.get("/", async (req, res) => {
    try {

        User.find({}).then(data => {
            res.json(data);
        }).catch(error => {
            res.status(408).json({ error });
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;