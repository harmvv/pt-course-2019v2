var mongoose = require("mongoose");

//usersschema
var userSchema = new mongoose.Schema({
    password: {
        type: String
    },
    imgUpload: 
        { data: Buffer, contentType: String },
    
    email: {
        type: String,
        unique: true
    },
    type: {
        type: String,
    },
    name: {
        type: String
    },
    memberSince: {
        type: String
    },
    profilePicUrl: {
        type: String
    },
    searchType: {
        type: String
    },
    iWant: {
        type: String
    },
  
});

module.exports = mongoose.model("users", userSchema);