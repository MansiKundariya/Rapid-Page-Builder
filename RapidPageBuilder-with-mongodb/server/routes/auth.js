const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

let user = {};
let email;

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        email = req.body.email;

        user = await User.find({ email: req.body.email });
        console.log(user);
        if (user.length === 0) {
            return res.status(401).send({ message: "Invalid email" })
        }   

        if(req.body.password !== user[0].password){
            return res.status(401).send({ message: "Invalid passowrd" })
        }

        // const validPassword = await bcrypt.compare(
        //     req.body.password, user.password
        // );   

        // if(!validPassword){
        //     return res.status(401).send({ message: "Invalid password" });
        // }

        const _token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
        // const token = user.generateAuthToken();


        const responseData = {
            token: _token,
            id: email,
            message: "LoedIn successfully!"
        }
        res.status(200).send(responseData);

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;


