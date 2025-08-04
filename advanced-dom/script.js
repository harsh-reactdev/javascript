'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');



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

/////////////////////////////////////////////////////////////////////////////
// Page navigation using event delegation

/////////////////////////////////
// without using event delegation
/////////////////////////////////
// document.querySelectorAll('.nav__link').forEach((element) => {
//     element.addEventListener('click', function (e) {
//         e.preventDefault();

//         const toID = this.getAttribute("href");
//         // console.log(toID);
//         // console.log(this.href); //gives absolute url

//         document.querySelector(toID).scrollIntoView({ behavior: 'smooth' });
//     });
// });

/////////////////////////////////
// using event delegation
/////////////////////////////////
const handleNavigation = function (e) {
    e.preventDefault();

    // if event triggers from the parent element itself, ignore it and return
    if (e.target.getAttribute('class') == 'nav__links') {
        return;
    };
    // getting the id of the element where the event actually originated
    // and also getting the href attribute from the element to identify where to navigate to
    const toID = e.target.getAttribute('href');

    // getting the destination element to scroll to and adding smooth scrolling to it
    document.querySelector(toID).scrollIntoView({ behavior: 'smooth' });
};

navLinks.addEventListener('click', handleNavigation);

tabsContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const el = e.target.closest('.operations__tab');
    if (el) {
        // disabling active class on all tabs
        tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
        // enabling active class on clicked tab
        el.classList.add('operations__tab--active');

        // enabling content wrt the active tab
        tabsContent.forEach(tC => tC.classList.remove('operations__content--active'));
        document.querySelector(`.operations__content--${el.dataset.tab}`).classList.add('operations__content--active');
    };
    // const targetElement =
});