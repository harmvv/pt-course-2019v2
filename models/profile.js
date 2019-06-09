var mongoose = require("mongoose");

//usersschema
var profileSchema = new mongoose.Schema({
    password: {
        type: String
    },
    email: {
        type: String
    },
    profileName: {
        type: String
    },
    rofileMemberSince: {
        type: String
    },
    profilePictureUrl: {
        type: String
    },
    profileSearchType: {
        type: String
    },
    profileType: {
        type: String
    }
});

module.exports = mongoose.model("profiles", profileSchema);