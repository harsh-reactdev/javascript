'use strict';

const imagesContainer = document.querySelector('.images');

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};

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

const loadNPause = async function () {
    try {
        let currentImg = await createImg('img/img-1.jpg');
        await wait(2);
        currentImg.style.display = 'none';

        currentImg = await createImg('img/img-2.jpg');
        await wait(2);
        currentImg.style.display = 'none';

        currentImg = await createImg('img/img-3.jpg');
        await wait(2);
        currentImg.style.display = 'none';
    } catch (err) {
        console.error(err.message);
    }

};

// loadNPause();


const loadAll = async function (pathArr) {
    try {
        const imgPromises = pathArr.map(async (img) => {
            const current = await createImg(img);
            // console.log(current);
            current.classList.add('parallel');
            return current;
        });
        // console.log(imgPromises);
        const imgs = await Promise.allSettled(imgPromises);
        // const img = await imgPromises[0];
        console.log(imgs);
    } catch (err) {
        console.error(err.message);
    }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);