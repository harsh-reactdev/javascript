'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
// };

// const account2 = {
//     owner: 'Jessica Davis',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
// };

// const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
// };

// const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// /////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// DATA FOR +S AND DATES SECTION

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

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


// CURRENT USER
let currentUser;
let sortState = false;
///////////////////////////////
// creating user names on web app instantiation
const createUsername = function (accounts) {
    accounts.forEach((acc) => {
        acc['username'] = acc.owner.toLowerCase().split(' ').map((item) => item[0]).join('');
    });
};
createUsername(accounts);

//////////////////////////
// displaying transactions
const displayMovements = function (movements) {
    const sorted = sortState ? movements.toSorted((a, b) => b - a) : movements;
    sorted.forEach(function (mov, i) {
        const movType = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${movType}">${i + 1} ${movType}</div>
                <div class="movements__value">₹${Math.abs(mov).toFixed(2)}</div>
            </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

//////////////////////
// calculating summary
const calcSummary = function (transactions, intRate) {
    const incomes = transactions.filter(tr => tr > 0).reduce((bal, tr) => bal + tr, 0);
    const payments = transactions.filter(tr => tr < 0).reduce((bal, tr) => bal + tr, 0);

    const interest = transactions.filter(tr => tr > 0).map(tr => (tr * intRate) / 100).filter(tr => tr > 1).reduce((totInt, curr) => totInt + curr);

    labelSumIn.textContent = `₹${incomes.toFixed(2)}`;
    labelSumOut.textContent = `₹${Math.abs(payments).toFixed(2)}`;
    labelSumInterest.textContent = `₹${interest.toFixed(2)}`;
};

//////////////////////////////
// calculating account balance
const calcBalance = function (acc) {
    acc.balance = acc.movements.reduce((bal, mov) => bal + mov, 0);
    labelBalance.textContent = `₹${acc.balance.toFixed(2)}`;
};

const initUserUI = function () {
    const { movements, interestRate, owner } = currentUser;

    labelWelcome.textContent = `Welcome back, ${owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    calcBalance(currentUser);
    displayMovements(movements);
    calcSummary(movements, interestRate);

};

////////////////
// login handler
const handleLogin = function (e) {
    e.preventDefault();
    currentUser = accounts.find((acc) => inputLoginUsername.value === acc.username && parseInt(inputLoginPin.value) === acc.pin);

    // clearing input fields and removing focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    initUserUI(currentUser);
};


///////////////////
// transfer handler
const checkUserValidity = function (toUser) {
    let flag = false;
    accounts.forEach(acc => {
        // check if user exists
        if (acc.username === toUser || acc.owner === toUser) {
            flag = true;
        }
    });
    return flag;
};

const initTransfer = function (to, amt) {
    // find the recepient account
    const toAcc = accounts.find(acc => acc.username === to || acc.owner === to);

    // credit the receiver
    toAcc?.movements.push(amt);

    // debit the giver
    currentUser.movements.push(-amt);

    initUserUI(currentUser);
};

const handleTransfer = function (e) {
    e.preventDefault();

    const transferTo = inputTransferTo.value;
    const transferAmt = +inputTransferAmount.value;

    // check if the transation is not being made for oneself
    if (transferTo !== currentUser.username && transferTo !== currentUser.owner) {
        // check the transfer amount isn't greater than the current balance amount
        // if (transferAmt < +(labelBalance.textContent.split('₹')[1])) {
        if (transferAmt && transferAmt <= currentUser.balance) {

            // check recipient user validity
            checkUserValidity(transferTo) ? initTransfer(transferTo, transferAmt) : window.alert('No such user found.!');
        }
    }
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
};

///////////////////////////////////
// Loan request handler
const handleLoanReq = function (e) {
    e.preventDefault();

    // const loanAmt = +inputLoanAmount.value;
    const loanAmt = Math.floor(inputLoanAmount).value;

    if (loanAmt > 0 && currentUser.movements.some(mov => mov > 0 && mov > (0.1 * loanAmt))) {
        currentUser.movements.push(loanAmt);
        initUserUI();
    }

    inputLoanAmount.value = '';
    inputLoanAmount.blur();
};

///////////////////////////////////
// Sorting
const handleSort = function (e) {
    e.preventDefault();

    const { movements } = currentUser;
    sortState = !sortState;

    displayMovements(movements);
};

///////////////////////////////////
// Log out
const logout = function () {
    currentUser = {};
    // initUserUI(currentUser);
    containerApp.style.opacity = 0;
};

///////////////////////////////////
// Account close handler
const closeAcc = function (e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentUser.username && +inputClosePin.value === currentUser.pin) {
        const toDelete = accounts.findIndex(user => user.username === currentUser.username);
        accounts.splice(toDelete, 1);

        logout();
    };

    inputClosePin.value = inputCloseUsername.value = '';
};


// //////////////////////////////////////////////////////////
// EVENT LISTENERS

btnLogin.addEventListener('click', handleLogin);
btnTransfer.addEventListener('click', handleTransfer);
btnLoan.addEventListener('click', handleLoanReq);
btnClose.addEventListener('click', closeAcc);
btnSort.addEventListener('click', handleSort);

// /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////