'use strict';

const a = '87';
// console.log(+a); + sign converts the string into a number

const randIntGenerator = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// console.log((randIntGenerator(1, 6)));

// ////////////////////////////////////////
// rounding integers

Math.trunc(23.4); // rounds it to 23 as trunc function moves towards 0
Math.floor(-3.6); // rounds it to -4 as floor function moves towards negative infinity

// rounding decimals
(2.7).toFixed(0); //returns 3 as a string
+(2.7).toFixed(0); //rounds to 3 as a string and then is converted to a number



