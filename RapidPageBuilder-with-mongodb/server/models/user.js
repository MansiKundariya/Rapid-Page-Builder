const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    // token: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

// userSchema.methods.generateAuthToken = function (){
//     const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY);
//     console.log(token);
//     return token;
// }

const User = mongoose.model("User", userSchema);

module.exports = User;