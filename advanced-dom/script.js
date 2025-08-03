'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
    const sec1Coords = section1.getBoundingClientRect();

    // window.scrollTo({
    //     left: sec1Coords.left + window.pageXOffset,
    //     top: sec1Coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // });

    section1.scrollIntoView({ behavior: 'smooth' });
});

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


////////////////////////////////////////////////////////////////////////////
// random color generator 
// event propagation

// const randomColor = (min = 0, max = 255) => Math.floor(Math.random() * (max - min + 1) + min);

// const generateRgb = () => `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;

// // console.log(generateRgb());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//     // console.log('Link');
//     this.style.backgroundColor = generateRgb();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//     // console.log('Links');
//     this.style.backgroundColor = generateRgb();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//     // console.log('Nav');
//     this.style.backgroundColor = generateRgb();
// });