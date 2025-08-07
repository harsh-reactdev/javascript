'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('.header');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');

const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const initCoords = section1.getBoundingClientRect();

const nav = document.querySelector('.nav__links');
const navComponent = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

//////////////////////////////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
    // const sec1Coords = section1.getBoundingClientRect();
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

nav.addEventListener('click', handleNavigation);

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

//////////////////////////////////////////////////////////////////////////////
// passing arguments to event handlers

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        // the value of this here is undefined by default in strict mode
        // its being overridden by binding a value to this
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
};

// binding the value of this to 0.5 in the handler callback fn
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////////////////////////////
// sticky navigation

// window.addEventListener('scroll', function () {
//     if (window.scrollY > initCoords.top) {
//         nav.classList.add('sticky');
//         // nav.style.opacity = 0.75;
//     } else {
//         nav.classList.remove('sticky');
//         // nav.style.opacity = 1;
//     }
// });

// using Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        navComponent.classList.add('sticky');
    } else {
        navComponent.classList.remove('sticky');
    }
};
const observer = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});

observer.observe(header);

// //////////////////////////////////////////////////////////////////////////
// revealing sections

const revealSections = function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    });
};

const sectionsObs = new IntersectionObserver(revealSections, {
    root: null,
    threshold: 0.15
});

allSections.forEach((section) => {
    section.classList.add('section--hidden');
    sectionsObs.observe(section);
});

// ///////////////////////////////////////////////////////////////////////////////
// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); //selecting images with data-src attribute only

const lazyLoadImg = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    // on instersection, replace low quality img with high quality img
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
};

const imgObs = new IntersectionObserver(lazyLoadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
});

imgTargets.forEach((img) => imgObs.observe(img));

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// implementing slider component
const slider = function () {
    const sliderBtnLeft = document.querySelector('.slider__btn--left');
    const sliderBtnRight = document.querySelector('.slider__btn--right');
    let curSlide = 0;
    let maxSlide = slides.length;

    ///////////////////////////////////////////////////////////////////////////////////////
    // functions

    // adding dots for slide navigation
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (translationVal) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - translationVal)}%)`;
        });

    };

    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    /////////////////////////////////////////////////////////////////////
    // event listeners

    // move to next slide
    sliderBtnRight.addEventListener('click', nextSlide);

    // move to previous slide
    sliderBtnLeft.addEventListener('click', prevSlide);

    // adding keyboard events for the slider
    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        if (e.key === 'ArrowRight') {
            nextSlide();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            goToSlide(e.target.dataset['slide']);
            activateDot(e.target.dataset['slide']);
        }
    });

    // initiate slider component

    const initSlider = function () {
        createDots();
        activateDot(curSlide);
        goToSlide(curSlide);
    };

    initSlider();
};

slider();

