const mongoose = require("mongoose");

module.exports = () => {
    try{
        mongoose.connect(process.env.DATABASE);
        console.log("Database connected successfully!");
    }catch(err){
        console.log(err);
        console.log("Could not connect to database!");
    }
}

// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false
// }).then(() => { console.log("Database connected successfully!") })
//     .catch((err) => { console.log(err) })
