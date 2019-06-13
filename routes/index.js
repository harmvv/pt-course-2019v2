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

//setup multer
// const multerConf = {
//   storage : multer.diskStorage({
//     destination : function(req, file, next){
//   next(null, "./public/images/profile");
//     }, filename: function(req, file, next){
//     console.log(file);
//     }
//   }),
  
//   };

// router.post("/upload",multer(multerConf).single("photo"), function(req, res){
//   res.send("this is post route upload");
// })

//server.js
 
 
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/profile')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage })

router.post('/uploadfile', upload.single('photo'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})







module.exports = router;