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
const { static } = require('express');
app.use('/images/', static('./public/images/profile'));
// Connection URL

// Home route
router.get('/', function (req, res, next) {
  if (req.session.currentuser) {
    console.log("werkt nu" + " " + req.session.currentuser)
    User.findOne({
      _id: req.session.currentuser._id
    }, function (err, user) {
     matchtesttype = user.type;
     console.log(matchtesttype);
    User.find({type : matchtesttype, _id :{ $ne: req.session.currentuser }}, function (err, users) { // Uses the User model to find data on the database
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
 
 
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/profile')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now ())
  }
})
var upload = multer({ storage: storage })

router.post('/', upload.single('photo'), (req, res, next) => {
 
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    // res.send(file)
    console.log("image file upload jatoch")
    var profilePicUrl = file.filename;
    console.log(file)
    User.updateOne({
    _id: req.session.currentuser._id,
  }, {
    profilePicUrl : profilePicUrl
  }, function (err) {
  
    // update the type of the user
    if (err) {
      console.log("dikke vette error")
      throw err;
    }
    //...
  
  
  res.redirect('/')
  });
  
})







module.exports = router;