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

router.get('/logout', function (req, res, next) {
  console.log("log out")
  req.session.destroy();
  res.redirect('/login')

});








module.exports = router;