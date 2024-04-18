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

let currentUser;

// labelDate.textContent = new Date().toJSON().slice(0, 10);


// clearing data from login input fields
const clearLoginForm = () => {
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
};

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; //clears the container before putting new data there

  movements.forEach(function (mov, i) {
    const typeOfMovement = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${typeOfMovement}">Tr.${i} ${typeOfMovement.toUpperCase()}</div>
      <div class="movements__value">${mov} ₨</div>
    </div>
  `;

    //adds the html to the specified posititon of the element, with which insertAdjacentHTML method is called.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

/////////////////////////////////////////////////
// map METHOD

// creating usernames for all the accounts of the bankist app
// const getInitial = userName =>
//   userName
//     .toLowerCase()
//     .split(' ')
//     .map(word => word[0])
//     .join('');

const createUserNames = function (accs) {
  accs.forEach(
    acc =>
    (acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join(''))
  );
};

createUserNames(accounts);
// console.log(accounts);

const getBalance = function (movements) {
  const balance = movements.reduce((bal, mov) => bal + mov, 0);
  labelBalance.textContent = `${balance} ₨`;
};

// getBalance(account1.movements);

const calcDisplaySummary = (movements, intRate) => {
  const deposits = movements
    .filter(mov => mov > 0)
    .reduce((tot, mov) => tot + mov, 0);
  labelSumIn.textContent = `${deposits} ₨`;

  const withdrawals = movements
    .filter(mov => mov < 0)
    .reduce((tot, mov) => tot + Math.abs(mov), 0);
  labelSumOut.textContent = `${withdrawals} ₨`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(dep => dep * (intRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest.toFixed(2)} ₨`;
};

// calcDisplaySummary(movements);
const updateUI = function () {
  displayMovements(currentUser.movements);
  getBalance(currentUser.movements);
  calcDisplaySummary(currentUser.movements, currentUser.interestRate);
};

const authorizeUser = function (e) {
  e.preventDefault(); //prevents form from submitting
  // console.log("logged in");
  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value));
  // console.log(currentUser);

  // display UI wrt currentUser
  if (currentUser) {
    const { movements, owner, interestRate } = currentUser;

    // remove focus from input fields
    // inputLoginUsername.value = inputLoginPin.value = '';
    // inputLoginPin.blur();
    clearLoginForm();

    //change welcome message
    labelWelcome.textContent = `Welcome back, ${owner.split(' ')[0]}`;

    //display movements UI
    displayMovements(movements);

    //display balance
    getBalance(movements);

    //display summmary data
    calcDisplaySummary(movements, interestRate);

    // set opacity back to 100
    containerApp.style.opacity = 100;
  } else {
    alert('No such user exists.!');
    clearLoginForm();
  }
};

const transfer = function (e) {
  e.preventDefault();

  const { userName: currentUserName, movements: currentUserMovements } = currentUser;

  const receiverUserName = inputTransferTo.value;
  const trAmt = Number(inputTransferAmount.value);
  // console.log(receiver, trAmt);

  // getting the receiver's account
  const receiverAcc = accounts.find(acc => acc.userName === receiverUserName);

  // transfer process
  if (receiverAcc && currentUserName !== receiverUserName) {
    receiverAcc.movements.push(trAmt);
    currentUserMovements.push(-trAmt);
    // console.log(currentUserMovements);
    updateUI();
  }

  inputTransferTo.value = inputTransferAmount.value = '';
};

btnLogin.addEventListener('click', authorizeUser);
btnTransfer.addEventListener('click', transfer);

/////////////////////////////////////////////////
// filter METHOD

// filtering only deposits

// returns a new array with only the elements of the original array that satisfies the condition in the callback function
const depositsOnly = account1.movements.filter(mov => mov > 0);
const withdrawalsOnly = account1.movements.filter(mov => mov < 0);
// console.log(withdrawalsOnly);

/////////////////////////////////////////////////
// reduce METHOD

// reducing movements to find out the global balance
// the first parameter of the callback function will be a accumulator variable that stores the previous accumulated value of the previous iteration
const balance = account1.movements.reduce((bal, mov) => bal + mov, 0);
// console.log(`Iteration ${i + 1} -> ${bal}`);
// console.log(balance);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

letters.join(' - ');
// returns a string like this a - b - c - d - e - f - g - h - i - j, and this is by joining all the elements of the array this method is called with seperated by the seperator sent as an argument or using comma by default when no argument is sent

/////////////////////////////////////////////////
// AT METHOD

const arr4 = [...arr2];

arr4.at(-1); //returns the last element

'harshi'.at(-1); //returns the last character of the string

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// forEach METHOD

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0)
//     console.log(`$${movement} credited.`);
//   else
//     console.log(`$${Math.abs(movement)} debited.`);
// }

// forEach method takes a callback function as a parameter which will be called at each iteration with the current item of the array as an argument to the callback function

const cbfn = (item, index, arr) => {
  // console.log(item, index, arr);
  // item > 0 ? console.log(`$${item} credited.`) : console.log(`$${Math.abs(item)} debited.`);
};

movements.forEach((movement, index, arr) => {
  //we can either write the callback function definition itself here
  // console.log(movement, index, arr);
  // movement > 0 ? console.log(`$${movement} credited.`) : console.log(`$${movement} debited.`);
});

movements.forEach(cbfn);
// or simply send the callback function defined somewhere as the argument for forEach

/////////////////////////////////////////////////
// forEach on maps

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//forEach when used on maps, calls the callback with arguments in order value of each map item, its key and the whole map itself
currencies.forEach(function (val, key, map) {
  // console.log(key, ' -> ', val);
});

/////////////////////////////////////////////////
// forEach on sets

// works same as maps but there is no key for set items so both key and value corresponds to the current set item of the iteration

const feSet = new Set(['USD', 'INR', 'EUR', 'CAD', 'GBP', 'EUR']);

// console.log(feSet); //sets contain only unique values

feSet.forEach(function (key, value, set) {
  // console.log(key, ' -> ', value, set);
  // same as maps, but key and value simply holds the same value of current set item and set is the entire set we are looping on
});

/////////////////////////////////////////////////
// array.MAP(() => {})

// map method returns a new array of all the results returned by applying a callback function on each element of the original array

const eurToUsd = 1.1;
const movementsUsd = movements.map(mov => Math.trunc(mov * eurToUsd));
// console.log(movementsUsd);

const movDescs = movements.map(
  (
    mov,
    index //the entire array is also accessible from the map method
  ) =>
    // mov > 0 ? `${index + 1} -> $${mov} credited.` : `${index + 1} -> $${Math.abs(mov)} debited.`
    `Transaction ${index + 1} -> You ${mov > 0 ? 'deposited' : 'withdrew'
    } $${Math.abs(mov)}.`
);

// console.log(movDescs);

// reduce method for maximum of an array

const maxMov = movements.reduce(
  (max, mov) => (mov > max ? mov : max),
  movements[0]
);
// console.log(maxMov);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// METHOD CHAINING

const totalDepInUSD = Math.trunc(
  movements
    .filter(mov => mov > 0)
    .map(dep => dep * eurToUsd)
    .reduce((tot, dep) => tot + dep, 0)
);
// console.log(totalDepInUSD);

// console.log(new Map([...'harshishere'].entries()));


/////////////////////////////////////////////////
/////////////////////////////////////////////////
//FIND METHOD

const firstFind = movements.find(mov => mov > 0); // returns the first value of the array thats greater than 0
// console.log(firstFind); 

const acc = accounts.find(user => user.userName === 'jd');
// console.log(acc);

// let currentUser = {};
// for (let user of accounts) {
//   if (user.userName === 'js')
//     currentUser = user;
// }
// console.log(currentUser);