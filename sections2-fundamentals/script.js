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
const calcAge = (birthyear) => 2024 - birthyear; //single line do not need return keyword
const calcAgeAndLog = (birthyear) => {
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

console.log(fruitJuicer(2, 3));
