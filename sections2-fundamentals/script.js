'use strict';

let hasDL = false;
const passTest = true;

// if (passTest) haaDL = true; // throws an error to the console when cant find a variabke

// if (hasDL) console.log("yay, I've got a DL");

//****************************************************************
// defining a function. This type of function here is called named function
// same function definition if assigned to a variable, will be called a function expression
function fruitProcessor(apples, oranges) {
  const juice = `A juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

// way to invoke/call a function
fruitProcessor(4, 5); //doesnt log anything as we have not written any instruction to. So in order to log it to the console, either add tht line to the function block or store the return from the function to a variable, Like this :
const juiceInfo = fruitProcessor(4, 5);
// console.log(juiceInfo);

// OR

// console.log(fruitProcessor(6, 7));

//****************************************************************

// function decalration
function calcAge1(birthyear) {
  return 2024 - birthyear;
}

// function expression
const calcAge2 = function (birthyear) {
  //this kind of function definition is called anonymous functions / nameless functions
  return 2024 - birthyear;
};

// Arrow functions
const calcAge = birthyear => 2024 - birthyear; //single line do not need return keyword
const calcAgeAndLog = birthyear => {
  // if we have multiple lines of code inside the function block, then we need flower braces and also a return keyword if we are returning any value
  const age = 2024 - birthyear;
  console.log(age);
};

//****************************************************************

// Functions calling other functions

const fruitCutter = function (num_fruits) {
  return num_fruits * 4;
};

const fruitJuicer = function (apples, oranges) {
  const applePcs = fruitCutter(apples);
  const orangePcs = fruitCutter(oranges);

  return `Juice with ${applePcs} of apple and ${orangePcs} of oranges.`;
};

// console.log(fruitJuicer(2, 3));

//****************************************************************
// Arrays

const a = [1, 'asd', true, {}, []];
const b = new Array(1, 'sdfds', false, {}, []);

a.push(1);
// console.log(a);

a.pop();
// console.log(a);

a.unshift(1);
// console.log(a);

a.shift();
// console.log(a);

a.indexOf(1); //returns index

a.includes(1); // returns true if present and false otherwise

const c = a.map(elem => {
  //do something with each item
  // does smthng with each item and adds the modified array item to the new array
}); //returns a new array with modified items of the array being iterated over

//****************************************************************
// Objects

const aObj = new Object({
  //object constructor syntax
  name: 'harsh',
  age: 24,
});

const bObj = {
  //Object literal syntax
  name: 'harsh',
  job: 'React Ts Developer',
  friends: ['Akhil', 'Jeevan', 'Mahesh'],
};

// console.log(aObj);
// console.log(bObj);

// iterations :
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < arr2.length; i++) {
  // continue; used to skip an interation
  // break; used to terminate the loop immediately
  // do something
}

while (true) {
  //do something
  //use when we dont know the number of iterations to be performed
}
