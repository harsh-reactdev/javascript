'use strict';

// SELECTING elements
// console.log(document.documentElement); //gives the entire html document

// console.log(document.head); //the head tag
// console.log(document.body); //similarly body

// const header = document.querySelector('.header');

// const allSections = document.querySelectorAll('.section');
// console.log(allSections); //returns a nodelist of all nodes with the specified classname


// console.log(document.getElementById('section--1')); //returns a NodeList which is not live, most times

// const allButtons = document.getElementsByClassName('btn'); //returns a HTMLCollection, which is live
// console.log(allButtons);

// console.log(document.getElementsByTagName('button'));


// /////////////////////////////////////////////////////////////////////////////////
// CREATING html elements
// .insertAdjacentHTML

// .createElement(elem_name_as_string)
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We collect cookies for personalisation.';

message.innerHTML = `We collect cookies for personalisation. <button class='btn btn--close--cookie'>Got it</button>`;
// header.prepend(message); //prepending adds the given child as the first chxild of the element its being called from, in this case, header element
// header.append(message);


// header.append(message.cloneNode(true)); appends multiple copies of the same element

// header.before(message); //adds the element before the header element
// header.after(message); //adds the element after the header element

// document
//     .querySelector('.btn--close--cookie')
//     .addEventListener('click', function () {
//         message.remove();
//         // message.parentElement.removeChild(message);
//     });


//////////////////////////////////////////////
// styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(getComputedStyle(message));

// document.documentElement.style.setProperty();

// ///////////////////////////////////////////////////////////////////
// attributes

const logo = document.querySelector('.nav__logo');

// logo.alt; // returs the value for src attribute
// logo.src; // returns value of src attribute
// logo.className; //returns class name
// logo.classList; //returns class list
// // console.log(logo); can also access its attributes by calling, for example, logo.alt or logo.src

// // to read non-standard attributes
// logo.getAttribute('designer'); //will give us the value for the non-standard attribute that the user has set

// // to set, 
// logo.setAttribute('designer', 'harsh');

// // data attributes
// logo.dataset;

// // ///////////////////////////////////////////
// // classes

// logo.classList.add(); // adds class names | we can send one or many separated by commas
// logo.classList.remove(); // remove class names
// logo.classList.toggle(); // toggle classname
// logo.classList.contains(); //check if the classList contains the specified class name

// logo.className; //gives access to one classname in particular
