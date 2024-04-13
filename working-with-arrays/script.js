'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = [...arr];
/////////////////////////////////////////////////
// SLICE METHOD

arr.slice(1); //extracts everything from the 1st index to end of the array

arr.slice(1, 3); //extracts everything from 1st index to 2nd index and 3rd index wont be included

arr.slice(0, -3); //this means, extracts everything from the array from the start index and excludes the the last 3 elements of the array.

arr.slice(); //creates a shallow copy of the array


/////////////////////////////////////////////////
// SPLICE METHOD

// console.log(arr);

arr.splice(2); //removes all the elements except the first 2 elements of the array and returns the array of deleted elements in it

arr.splice(-1); //removes the last element from the array

arr.splice(1, 2); // removes 2 elements starting from index 1 and returns an array with these 2 removed elements


/////////////////////////////////////////////////
// REVERSE METHOD
let arr3 = ['j', 'i', 'h', 'g', 'f'];

arr3.reverse(); //reverses the original array while also mutating it

// console.log(arr3); //shows that the reverse method mutates the original array


/////////////////////////////////////////////////
// CONCAT METHOD

const letters = arr2.concat(arr3); // concatenates arr2 and arr3 and gives new array with all elements of arr2 and arr3

// console.log([...arr2, ...arr3]); //same as concat method

// console.log(letters);


/////////////////////////////////////////////////
// JOIN METHOD

console.log(letters.join(' - '));
// returns a string like this a - b - c - d - e - f - g - h - i - j, and this is by joining all the elements of the array this method is called with seperated by the seperator sent as an argument or using comma by default when no argument is sent
