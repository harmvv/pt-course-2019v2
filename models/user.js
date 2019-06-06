var mongoose = require("mongoose");

//usersschema
var userSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model("users", userSchema);