'use strict';

const showModal = document.querySelectorAll('.show-modal');
// querySelectorAll -> returns a node list (like an array) of all the elements with that particular classname

const modalWindow = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const onModalOpen = function () {
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');

};

const addEventHandler = function (elem, event, callback) {
    elem.addEventListener(event, callback);
};

for (let i = 0; i < showModal.length; i++) {
    addEventHandler(showModal[i], 'click', onModalOpen);
}

const onModalClose = function () {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
};

addEventHandler(closeModalBtn, 'click', onModalClose);
addEventHandler(overlay, 'click', onModalClose);

