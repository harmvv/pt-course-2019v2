/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/


// Opens menu

console.log("pino");

function openMenu() {
  console.log("hello2")
  var x = document.querySelector(".hamburgernav");
  var main = document.querySelector("main");
  var ulnav = document.querySelector(".ulnav");
  if (x.style.display === "block") {
    x.style.display = "none";
    main.style.display = "block"
    ulnav.style.display = "flex"
  } else {
    x.style.display = "block";
    main.style.display = "none";
    ulnav.style.display = "none"
  }
}
var hamburgericon = document.querySelector('.hamburgericon');
var close = document.querySelector('.close');
hamburgericon.addEventListener("click", openMenu);
close.addEventListener("click", openMenu);


// users


//Retrieve the template data from the HTML .
var template = $('#matchestemplate').html();


function calculateType(event) {
  // event.preventDefault();
  // console.log("test submit")
  var option1 = document.querySelector('input[name="vacation"]:checked').value
  var option2 = document.querySelector('input[name="preferences"]').value
  var option3 = document.querySelector('input[name="date"]:checked').value
  var outcomeInput = document.querySelector('input[name="outcomeInput"]')
  var outcome = Number(option1) + Number(option2) + Number(option3);
  console.log("werkt dit")
  console.log("test submit" + option1 + " " + option2 + " " + option3);
  console.log(outcome);
  var type = "";
  if (outcome < 12) {
    type = "Relaxer";
  } else if (outcome > 11 && outcome < 20) {
    type = "Ontdekker"
  } else {
    type = "Avonturier"
  }
  console.log(type)
  outcomeInput.value = type
};

var bucketForm = document.querySelector(".buckettest")
bucketForm.addEventListener("submit", calculateType);