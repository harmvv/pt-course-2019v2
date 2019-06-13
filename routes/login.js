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

//Login page

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'login Validation'


  });

});

router.post('/login', function (req, res, next) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function (err, currentuser) {
    if (err) {
      return res.status(500).send();
    } else if (!currentuser) {
      return res.status(404).send();

    }
    console.log(currentuser);
    req.session.currentuser = currentuser;
    req.session.save(function (currentuser) {

    });
    User.find({}, function (err, users) { // finds the user data using the model 
      // find the profile info using the model
      res.render('index', { // render the index page
        users: users, // use the user info to display it on the template
        title: "Home",
        user: req.session.currentuser
      })


    });

  });



});


module.exports = router;