var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var MongoClient = require('mongodb', ).MongoClient
var assert = require('assert');
var User = require('../models/user')
var Profile = require("../models/profile")
var passport = require("passport")
var app = express();
var expressValidator = require("express-validator")
var expressSession = require("express-session");
// Connection URL

// Home route
router.get('/', function (req, res, next) {
  if (req.session.currentuser) {
    console.log("werkt nu" + " " + req.session.currentuser)
    User.find({}, function (err, users) { // Uses the User model to find data on the database
      User.findOne({
        _id: req.session.currentuser._id
      }, function (err, user) {
        res.render('index', { // render the index template
          users: users, //  the users are also called users in the template
          title: "Home",
          user: user
        })
      })
    });
  } else {
    res.redirect('/login')
  }
});

module.exports = router;