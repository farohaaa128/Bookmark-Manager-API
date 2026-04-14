const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Your Name Is Required"],
        trim : true
    },
    email : {
        type : String,
        required : [true , "Your Email Is Required"],
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : [true, "Your Password Is Required"],
        minlength : 6,
        trim : true
    } 
});

const user = mongoose.model('User',userSchema);

module.exports = user;