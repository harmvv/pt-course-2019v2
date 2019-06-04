var mongoose = require("mongoose");

//usersschema
var userSchema = new mongoose.Schema({
    naam: {
        type: String
    },
    lidSinds: {
        type: String
    },
    profielFotoUrl: {
        type: String
    },
    zoekType: {
        type: String
    },
    wilGraag: {
        type: String
    }
});

module.exports = mongoose.model("users", userSchema);