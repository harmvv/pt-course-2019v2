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




// buckettest route
router.get('/buckettest', function (req, res, next) {
  if(req.session.currentuser){
  res.render('buckettest', {
    success: req.session.success,
    errors: req.session.errors
  }); // renders the buckettest template on /buckettest
  req.session.errors = null;
}
else {
  res.redirect('/login')
}
});

// Reroute to home after buckettest is completed
router.post('/buckettest', function (req, res) { // when / gets post method
  console.log('new buckettest data');
  var type = req.body.outcomeInput; // gets input from form bucketlist
  console.log(type); // log in to the console
  //  Profile.updateOne({}, { profileType: type });
  User.updateOne({
    _id: req.session.currentuser._id,
  }, {
    type: type
  }, function (err) {

    // update the type of the user
    if (err) {
      throw err;
    }
    //...
  });

  res.redirect('/')
});



module.exports = router;