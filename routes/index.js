var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var MongoClient = require('mongodb',).MongoClient
var assert = require('assert');
var User = require('../models/user')
var Profile = require("../models/profile")
// Connection URL

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+"Buckettest?retryWrites=true&w=majority",{ useNewUrlParser: true })
var db = mongoose.connection; // here i make a connection with mongodb my host, username and pw are in the .env file

db.once('open', function() {
  console.log("connected mongodb")
}); // check if we are connected to mongodb

db.on('error', console.error.bind(console, 'MongoDB connection error:')); // if we arent connected we get an error
//
//db check connection



// Home route
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){ // Uses the User model to find data on the database
     Profile.find({}, function(err, profiles){ // uses the Profile model to find the datt of the current user
    res.render('index',{ // render the index template
      users : users, //  the users are also called users in the template
      profiles : profiles, // the profile info is also called profiles in the template
      title : "Home",
  })
    })
    
});

});

// buckettest route
router.get('/buckettest', function(req, res, next) {
  res.render('buckettest',{ success: req.session.success, errors: req.session.errors}); // renders the buckettest template on /buckettest
  req.session.errors = null;
});

// Reroute to home after buckettest is completed
router.route('/').post(function (req, res) { // when / gets post method
  console.log('new buckettest data'); 
  var type = req.body.outcomeInput; // gets input from form bucketlist
  console.log(type); // log in to the console
  //  Profile.updateOne({}, { profileType: type });
  Profile.update({ _id:"5cf8d800db13d00c441ec343"}, { profileType: type }, function(err) { // update the type of the user
    if(err) { throw err; }
    //...
});
  User.find({}, function(err, users){ // finds the user data using the model 
    Profile.find({}, function(err, profiles){ // find the profile info using the model
    res.render('index',{ // render the index page
      users : users, // use the user info to display it on the template
      profiles : profiles, // use the profile info to display it on the template
      title : "Home",
  })
    })
    
});
});


/* GET form page. */
router.get('/form', function(req, res, next) {
  res.render('form', {      title: 'Form Validation'
  , success: req.session.success, errors: req.session.errors
 });
  req.session.errors = null;
});

router.post('/submit', function(req, res, next) {
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/form');
});

// mongodb routes

//test

router.get('/unstable', function(req, res, next) {
  res.render('index', { title: 'Harms buckettest', condition : false });
});



//route mongo

router.get('/mongo', function(req, res, next) {
  const user = new User({
    name: "Loes van Porten",
    memberSince: '2016',
profilePicUrl: "loes.png",
type : "Avondturier",
searchType: "Relaxer",
iWant : "Ik wil nog eens op safari"
  })

  user.save(function(err){
    User.find({}, function(error, user) {
      if(error) {
        return console.log(error)
      }
    
      console.log(user)
      res.render('index', { title: 'Harms buckettest', condition : false })
    })
  })
})

//test profiles

router.get('/mongoprofile', function(req, res, next) {
  const profile = new Profile({
    profileName: "Loes van Porten",
    profileMemberSince: '2016',
profilePictureUrl: "loes.png",
profileType : "Avondturier",
profileSearchType: "Relaxer"
  })

  profile.save(function(err){
    Profile.find({}, function(error, profile) {
      if(error) {
        return console.log(error)
      }
    
      console.log(profile)
      res.render('index', { title: 'Harms buckettest', condition : false })
    })
  })
})

//route mongo

// new get route
router.get("/test/:id", function(req, res, next){
  res.render("test", {output: req.params.id})

})

// new post route

router.post("/test/submit", function(req, res, next){
  var id = req.body.id;
  res.redirect(/test/ + id);
})

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});


/* GET users details. */
router.get('/users/detail', function(req, res, next) {
  res.send('detail');
});


module.exports = router;

//bring in model


// Oude code 

// oude mongodb connectie

// const url = 'mongodb+srv://harm:buckettest@buckettest-pw7xg.mongodb.net/test?retryWrites=true&w=majority';

// // Database Name
// const dbName = 'Buckettest';

// Use connect method to connect to the server
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, client, ) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });


//oude manier mongodb connectie




// var people = 
// {
// "users" : [
//   {
//    "naam" : "Lisa van Poten",
// "lidSinds" : "2017" ,
// "type" : "Ontdekker",
// "profielFotoUrl":  "lisa.png",
// "zoekType" : "ontdekker of een avondturier",
// "wilGraag" : "Ik wil graag de Mount Everest is een keer beklimmen"
// },
// {
//   "naam" : "Loes van Katen", 
//   "lidSinds" : "2016",
//   "profielFotoUrl": "loes.png",
//   "zoekType" : "Relaxer",
//   "wilGraag" : "Ik wil graag nog eens de Grand Canyon zien"
// },
// {
// "naam" : "Marjolein van Goten", 
// "lidSinds" : "2016",
// "profielFotoUrl": "marjolein.png",
// "zoekType" : "Relaxer",
// "wilGraag" : "Ik wil graag nog eens de Grand Canyon zien"
// }
// ]

// }
/* GET home page. */





//outcome buckettest route
// router.post('/', function(req, res, next) {
//   var type = res.body.outcomeInput;
  
//   User.find({}, function(err, users){
    
//     Profile.find({}, function(err, profiles){
//     // console.log(users + profiles)
    
//     res.render('index',{
//       content : "Dit is content",
//       users : users,
//       profiles : profiles,
//       // people: people,
//       // oudProfile : oudProfile,
//       title : "Home",
//   })
//     })
    
// });

// });

//this is home route with profile working

// router.get('/', function(req, res, next) {
//   Profile.find({}, function(err, profiles){
//     console.log(profiles)
//     res.render('index',{
//       content : "Dit is content",
//       profiles : profiles,
//       oudProfile : oudProfile,
//       title : "Home",
//   })

    
// });

// });
