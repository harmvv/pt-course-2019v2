var mongoose = require("mongoose");

//usersschema
var profileSchema = new mongoose.Schema({
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