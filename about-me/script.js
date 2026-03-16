const roles = [
"Full-Stack Developer",
"Frontend Developer",
"Student",
"Web Developer",
"Python Aspirant"
];

let roleIndex = 0;
let charIndex = 0;
const typingText = document.getElementById("typing-text");

function typeEffect(){

if(charIndex < roles[roleIndex].length){
typingText.textContent += roles[roleIndex].charAt(charIndex);
charIndex++;
setTimeout(typeEffect,80);
}
else{
setTimeout(eraseEffect,2000);
}

}

function eraseEffect(){

if(charIndex>0){
typingText.textContent = roles[roleIndex].substring(0,charIndex-1);
charIndex--;
setTimeout(eraseEffect,40);
}
else{

roleIndex++;

if(roleIndex >= roles.length){
roleIndex = 0;
}

setTimeout(typeEffect,200);

}

}

document.addEventListener("DOMContentLoaded",function(){
setTimeout(typeEffect,500);
});

const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {

document.documentElement.classList.toggle("dark");

if(document.documentElement.classList.contains("dark")){
toggle.textContent="☀️";
}
else{
toggle.textContent="🌙";
}

});