const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : 10,
        required : true,
        trim : true
    },
    url : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        enum : {
            values : ["article", "video", "tool"],
            message : "You Must Choose From These Option"
        },
        default : "article",
        required : true,
        trim : true
    },
    description : {
        type : String,
        minlength : 15,
        trim : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
});

const bookMark = mongoose.model("Bookmark" , BookmarkSchema);

module.exports = bookMark;