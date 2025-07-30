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
        '2024-11-18T21:31:17.178Z',
        '2024-12-23T07:42:02.383Z',
        '2025-01-28T09:15:04.904Z',
        '2025-04-01T10:17:24.185Z',
        '2025-05-08T14:11:59.604Z',
        '2025-07-25T17:01:17.194Z',
        '2025-07-27T23:36:17.929Z',
        '2025-07-29T10:51:36.790Z',
    ],
    currency: 'INR',
    locale: 'en-IN', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2024-11-01T13:15:33.035Z',
        '2024-11-30T09:48:16.867Z',
        '2024-12-25T06:04:23.907Z',
        '2025-01-25T14:18:46.235Z',
        '2025-02-05T16:33:06.386Z',
        '2025-04-10T14:43:26.374Z',
        '2025-06-25T18:49:59.371Z',
        '2025-07-26T12:01:20.894Z',
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

const localiseDateLabel = function (locale, date) {

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        // weekday: 'long'
    };

    // const locale = navigator.language;
    // console.log(locale);

    return new Intl.DateTimeFormat(locale, options).format(date);
};

///////////////////////////////
// Adding current date
// (() => {
//     const now = new Date();
//     const day = `${now.getDate()}`.padStart(2, 0);
//     const month = `${now.getMonth() + 1}`.padStart(2, 0);
//     const year = now.getFullYear();

//     const hour = now.getHours();
//     const min = `${now.getMinutes()}`.padStart(2, 0);

//     labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
// })();


///////////////////////////////////////////////
// creating user names on web app instantiation
const createUsername = function (accounts) {
    accounts.forEach((acc) => {
        acc['username'] = acc.owner.toLowerCase().split(' ').map((item) => item[0]).join('');
    });
};
createUsername(accounts);


/////////////////////////////////////////////////////////
// localising numerical values
const localiseNumerics = function (locale, currency, value) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(value);
};


///////////////////////////////////////////////////////
// format dates with labels
const getDateLabel = (dateString, locale) => {
    const date = Date.now();
    const trDate = new Date(dateString);
    const dateDiff = Math.floor((date - trDate) / (1000 * 60 * 60 * 24));

    let label = '';
    if (dateDiff === 0) {
        label = 'Today';
        return label;
    } else if (dateDiff === 1) {
        label = 'Yesterday';
        return label;
    } else if (dateDiff <= 7) {

        return `${dateDiff} days ago`;
    }

    // const day = `${trDate.getDate()}`.padStart(2, 0);
    // const month = `${trDate.getMonth() + 1}`.padStart(2, 0);
    // const year = trDate.getFullYear();

    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
};


//////////////////////////
// displaying transactions
const displayMovements = function (cur) {
    containerMovements.innerHTML = '';
    const { movements, movementsDates, locale, currency } = cur;

    const trWithDate = movements.map((mov, i) => ({
        mov,
        // movDate: localiseDateLabel(new Date(movementsDates.at(i))),
        dateLabel: getDateLabel(movementsDates.at(i), locale),
    }));

    // const sorted = sortState ? movements.toSorted((a, b) => b - a) : movements;
    const sorted = sortState ? trWithDate.toSorted((a, b) => a.mov - b.mov) : trWithDate;


    sorted.forEach((movementObj, i) => {
        const { mov, dateLabel } = movementObj;
        const movType = mov > 0 ? 'deposit' : 'withdrawal';
        // const date = new Date(movDate).toLocaleDateString();


        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${movType}">${i + 1} ${movType}</div>
                <div class="movements__date">${dateLabel}</div>
                <div class="movements__value">${localiseNumerics(locale, currency, Math.abs(mov).toFixed(2))}</div>
            </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

//////////////////////
// calculating summary
const calcSummary = function ({ movements, interestRate, currency, locale }) {
    const incomes = movements.filter(tr => tr > 0).reduce((bal, tr) => bal + tr, 0);
    const payments = movements.filter(tr => tr < 0).reduce((bal, tr) => bal + tr, 0);

    const interestVal = movements.filter(tr => tr > 0).map(tr => (tr * interestRate) / 100).filter(tr => tr > 1).reduce((totInt, curr) => totInt + curr);

    labelSumIn.textContent = `${localiseNumerics(locale, currency, incomes.toFixed(2))}`;
    labelSumOut.textContent = `${localiseNumerics(locale, currency, Math.abs(payments).toFixed(2))}`;
    labelSumInterest.textContent = `${localiseNumerics(locale, currency, interestVal.toFixed(2))}`;
};

//////////////////////////////
// calculating account balance
const calcBalance = function (acc) {
    const { locale, currency } = acc;
    acc.balance = acc.movements.reduce((bal, mov) => bal + mov, 0);
    labelBalance.textContent = `${localiseNumerics(locale, currency, acc.balance.toFixed(2))}`;
};

const initUserUI = function () {
    const { owner, locale } = currentUser;

    labelWelcome.textContent = `Welcome back, ${owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    labelDate.textContent = localiseDateLabel(locale, new Date());
    calcBalance(currentUser);
    displayMovements(currentUser);
    calcSummary(currentUser);

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
    toAcc?.movementsDates.push(new Date().toISOString());


    // debit the giver
    currentUser.movements.push(-amt);
    currentUser.movementsDates.push(new Date().toISOString());

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
    const loanAmt = Math.floor(inputLoanAmount.value);

    if (loanAmt > 0 && currentUser.movements.some(mov => mov > 0 && mov > (0.1 * loanAmt))) {
        setTimeout(function () {
            currentUser.movements.push(loanAmt);
            currentUser.movementsDates.push(new Date().toISOString());
            initUserUI();
        }, 3000);
    }

    inputLoanAmount.value = '';
    inputLoanAmount.blur();
};

///////////////////////////////////
// Sorting
const handleSort = function (e) {
    e.preventDefault();

    sortState = !sortState;

    displayMovements(currentUser);
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