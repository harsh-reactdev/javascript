'use strict';

// SELECTING elements
console.log(document.documentElement); //gives the entire html document

console.log(document.head); //the head tag
console.log(document.body); //similarly body

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
console.log(allSections); //returns a nodelist of all nodes with the specified classname


console.log(document.getElementById('section--1')); //returns a NodeList which is not live, most times

const allButtons = document.getElementsByClassName('btn'); //returns a HTMLCollection, which is live
console.log(allButtons);

console.log(document.getElementsByTagName('button'));


// /////////////////////////////////////////////////////////////////////////////////
// CREATING html elements
// .insertAdjacentHTML

// .createElement(elem_name_as_string)
const msg = document.createElement('div');
msg.classList.add('cookie-msg');
msg.textContent = 'We collect cookies for personalisation.';

msg.innerHTML = `We collect cookies for personalisation. <button class='button--close-cokie'>Got it</button>`;
header.insertAdjacentHTML('afterbegin', msg.innerHTML);

console.log(msg);
