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

// ////////////////////////////////////////////////////////////
// Dates

// using date constructor
const now = new Date();
// console.log(now);

// by passing a date string to the constructor function
const now2 = new Date('March 15, 2000');
// console.log(now2);

const timeStamp = new Date(7 * 24 * 60 * 60 * 1000); //passing days in terms of milliseconds
// console.log(timeStamp);

// working with dates
now.getFullYear(); //returns the current year in YYYY format
now.getMonth() + 1; //returns the month number, where 0 -> January and so on 
now.getDay(); //returns the day of the week, 0 -> sunday

now.getTime(); //returns time stamp
Date.now(); //returns time stamp

now.getHours(); //returns the hour value of the time
now.getMinutes(); //likewise minutes
now.getSeconds(); //likewise seconds
now.toISOString(); //converts the time into an ISO string
// now.get()

const future = now.setFullYear(2035); //sets the year to provided value
// console.log(now.getHours());


////////////////////////////////////////////////////////////////////////////
// setTimeout and setInterval

setTimeout(() => { }, 5000, 8, 9, 10); //outputs after 5 seconds of code execution;

setInterval

