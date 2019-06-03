/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/


// Opens menu

console.log("pino");

function openMenu(){
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
        
  
  
  
  
  
  
  
 