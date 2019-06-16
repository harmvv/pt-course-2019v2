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
var multer = require("multer");
// Connection URL


/* GET form page. */
router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'Form Validation',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
});



// get the post form info
router.post('/submit', function (req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  req.check('name', 'Vul je naam in').notEmpty();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);
  req.check('iwant', 'Vul iets in wat je nog gedaan wil hebben').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/register');
  } else {
    req.session.success = true;


    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var date = new Date();
    var year = date.getFullYear();
    var iwant = req.body.iwant;
    console.log(email + password);
    res.redirect('/register');
    const user = new User({
      name: name,
      email: email,
      type:" ...? Doe de buckettest",
      password: password,
      memberSince: year,
      profilePicUrl: "newprofile.png",
      searchType: "Relaxer",
      iWant: iwant
    })

    user.save(function (err) {
      User.find({}, function (error, user) {
        if (error) {
          return console.log(error)
        }

        // console.log(user)

      })
    })
  }

});

module.exports = router;