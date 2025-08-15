'use strict';

const imagesContainer = document.querySelector('.images');

// imagesContainer.appendChild(element)

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

wait(2)
    .then(() => {
        // console.log('I waited for 2 seconds.!');

        return wait(1);
    }).then();

const createImg = function (imgPath) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imagesContainer.appendChild(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image does not exist.!'));
        });
    });
};
let currentImg;

createImg('img/img-1.jpg')
    .then(img => {
        currentImg = img;
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
        return createImg('img/img-2.jpg');
    })
    .then(img => {
        currentImg = img;
        return wait(2);
    })
    .then(() => {
        currentImg.style.display = 'none';
    })
    .catch(err => console.error(err));