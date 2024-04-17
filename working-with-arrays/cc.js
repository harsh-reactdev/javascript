'use strict';

const printStr = function (age, i) {
    const dogType = age > 3 ? 'an adult' : 'still a puppy';
    console.log(`Dog ${i + 1} is ${dogType} and is ${age} year(s) old`);
};

const checkDogs = function (juliaArr, kateArr) {
    const newArr = [...juliaArr.slice(1, -2), ...kateArr];
    newArr.forEach(printStr);
};

// const juliasDogs = [3, 5, 2, 12, 7];
// const katesDogs = [4, 1, 15, 8, 3];

const juliasDogs = [9, 16, 6, 8, 3];
const katesDogs = [4, 1, 15, 8, 3];

checkDogs(juliasDogs, katesDogs);