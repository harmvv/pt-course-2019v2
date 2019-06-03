var express = require('express');
var router = express.Router();
var profile = {
  "you" : [
      {
  "naam" : "Herman janssen",
"lidSinds" : "2017" ,
"type" : "Ontdekker",
"profielFotoUrl":  "images/profile/jouwprofielfoto.png",
"zoekType" : "ontdekker of een avondturier"
}]};

var people = 
{
"users" : [
  {
   "naam" : "Lisa van Poten",
"lidSinds" : "2017" ,
"type" : "Ontdekker",
"profielFotoUrl":  "lisa.png",
"zoekType" : "ontdekker of een avondturier",
"wilGraag" : "Ik wil graag de Mount Everest is een keer beklimmen"
},
{
  "naam" : "Loes van Katen", 
  "lidSinds" : "2016",
  "profielFotoUrl": "loes.png",
  "zoekType" : "Relaxer",
  "wilGraag" : "Ik wil graag nog eens de Grand Canyon zien"
},
{
"naam" : "Marjolein van Goten", 
"lidSinds" : "2016",
"profielFotoUrl": "marjolein.png",
"zoekType" : "Relaxer",
"wilGraag" : "Ik wil graag nog eens de Grand Canyon zien"
}
]

}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    people : people,
    profile : profile,
    title : "Home",
    succes: req.session.succes,
    errors : req.session.errors
});
req.session.errors = null
});

// error post route

router.post('/submit', function(req, res, next){
req.check("email", "invalid email addres").isEmail();
req.check("password", "password is invalid").isLength({min: 4}).equals(req.body.confirmPassword);

var errors = req.validationErrors();
if (errors){
  req.session.errors = errors;
  req.session.succes = false;
  }else{
req.session.succes = true;
  
  }
  res.redirect("/")
})

//test

router.get('/unstable', function(req, res, next) {
  res.render('index', { title: 'Harms buckettest', condition : false });
});


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

/* GET users listing. */
router.get('/buckettest', function(req, res, next) {
  res.render('buckettest');
});

/* GET users details. */
router.get('/users/detail', function(req, res, next) {
  res.send('detail');
});


module.exports = router;
