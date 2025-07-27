'use strict';


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// FOR OF loop

// for (const movement of movements) {
//     if (movement > 0) {
//         console.log(`You deposited Rs.${movement}`);
//     } else {
//         console.log(`You withdrew Rs.${Math.abs(movement)}`);
//     }
// }

// -----------------------------------------------------------------

// FOR EACH loop
const condCheck = function (item) {
    if (item > 0) {
        // console.log(`You deposited Rs.${item}`);
    } else {
        // console.log(`You withdrew Rs.${Math.abs(item)}`);
    }
};
// movements.forEach((movement) => {
//         if (movement > 0) {
//         console.log(`You deposited Rs.${movement}`);
//     } else {
//         console.log(`You withdrew Rs.${Math.abs(movement)}`);
//     }
// });

// movements.forEach(condCheck);

// movements.forEach()

// scope chain + closures 

const a = function () {

    // console.log(arguments);

    const b = 10;
    const c = 20;
    // console.log(this); //undefined in strict mode, window object otherwise

    // const d = () => console.log(this); //undefined in strict mode, window object otherwise
    // d();
    const res = {
        a: 10,
        b: 20,
        methods: {
            getB: () => console.log(this),
            getC: () => console.log(c)
        },
        userFunc: function () {
            // let self = this;
            const f1 = () => {
                // console.log(this);
            };
            f1();
            // return this
        }
    };
    return res;
};

let d = a(4, 12, 'harsh');
// console.log(d.userFunc())
// d.methods.getB();
// d.getC();

let f = ['a fox', 'and', 'a wolf'];
// a(...f)


const summer = function (...args) {
    console.log(args);
    let total = 0;
    for (const arg of args) {
        total += arg;
    }
    console.log(`The sum of all the numbers is ${total}`);
};

// summer(2, 3, 5, 6, 7);

// console.log(true && 0 && 'harsh'); //returns true

// console.log(undefined && null); //returns undefined although null is a falsy value


const winter = function ({ a, b, c }) {
    // console.log();
    return;
};

// winter({a: 10, b: 20, c: 30})

// -----------------------------------------------------------
// 13/07/25
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for-of loop
// for (const movement of movements) {
//     if (movement > 0) console.log(`Your account is credited with Rs.${movement}.`);
//     else console.log(`Your account is debited with Rs.${Math.abs(movement)}.`)
// }

// for (const [i, elem] of movements.entries()) {
//     console.log(i, elem);
// }

// console.log(movements.entries()); returns an iterable on which we can loop and gives us an array of index and element at each iteration


// ------------------------------------------------------------

// forEach
// break and conitnue doesn't work on forEach
const checkTransaction = function (item) {
    // console.log(arguments);
    // console.log('This is from forEach : ');
    if (item > 0) console.log(`Your account is credited with Rs.${item}.`);
    else console.log(`Your account is debited with Rs.${Math.abs(item)}.`);
};

// movements.forEach(checkTransaction);
// at each iteration of forEach, it sends the current item, its index and the whole array as an argument to the callback function

const act = movements.entries();

// -------------------------------------------------------------
// forEach on maps and sets

// maps
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);


// console.log(currencies.get('GBP'));
// currencies.forEach(function () {
//     console.log(arguments);
// })



//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// map method

const mappedMovs = movements.map(item => Math.abs(item));

// filter

const filteredMovs = movements.filter(item => Math.abs(item) >= 400);

const deposits = movements.filter(item => item > 0);
const withdrawals = movements.filter(item => item < 0);

// console.log(deposits, withdrawals);

// reduce

const reducedMovs = movements.reduce((prev, curr, ind) => {
    let bal = 0;
    bal += curr;
    return bal;
});


// console.log(reducedMovs);

// ////////////////////////////////////////////////////////////////

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

// for (let acc of accounts) {
//     let res = acc.owner === 'Jessica Davis' ? acc : 'Nope';
//     console.log(res);

// }

//concepts

// const usdToEur = 1.1;
// const Eur = account1.movements.map((item) => Math.trunc(item * usdToEur));
// console.log(Eur);

// max of array using reduce
const maxVal = movements.reduce((maxVal, mov) => mov > maxVal ? mov : maxVal);
// console.log(maxVal);


// //////////////////////////////////////////////
// array.flat(depth); method 
const ecstra = [20, [34, 54], 200, 400, [234, [45, 907]], 6520];
// console.log(ecstra.flatMap(ecs => [ecs, [ecs], [23, 54, [290, 453, 876]], 5600, 7800]));
// console.log(ecstra.flatMap((item) => item > 0));

// ///////////////////////////////////////////////
// array.sort() method
const unsortedStr = ['jeevan', 'abhi', 'puneeth', 'nithin', 'chandan'];
const sortedStrAsc = unsortedStr.sort();
const sortedStrDes = unsortedStr.sort((a, b) => b.localeCompare(a)); //sorts array of strings in descending order

// for numbers, we have to pass in a compare function that returns either a positive, negative or
// zero/NaN value so that we can either swap, keep order or do nothing respectively
const unsorted = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
const sortedIntAsc = unsorted.sort((a, b) => a - b); //sorts in ascending order
const sortedIntDes = unsorted.sort((a, b) => b - a); //sorts in descending order

// /////////////////////////////////////////////
// Object.groupBy(arr, callback)

const accHolders = [
    { id: 1, name: "Amit", type: "Savings" },
    { id: 2, name: "Sneha", type: "Current" },
    { id: 3, name: "Ravi", type: "Salary" },
    { id: 4, name: "Priya", type: "Fixed Deposit" },
    { id: 5, name: "Rahul", type: "NRI" },
    { id: 6, name: "Divya", type: "Savings" },
    { id: 7, name: "Karthik", type: "Current" },
    { id: 8, name: "Meena", type: "Salary" },
    { id: 9, name: "Arjun", type: "Fixed Deposit" },
    { id: 10, name: "Pooja", type: "NRI" },
    { id: 11, name: "Manoj", type: "Savings" },
    { id: 12, name: "Lavanya", type: "Current" },
    { id: 13, name: "Vinay", type: "Salary" },
    { id: 14, name: "Neha", type: "Fixed Deposit" },
    { id: 15, name: "Rakesh", type: "NRI" },
    { id: 16, name: "Swathi", type: "Savings" },
    { id: 17, name: "Abhinav", type: "Current" },
    { id: 18, name: "Sanjana", type: "Salary" },
    { id: 19, name: "Naveen", type: "Fixed Deposit" },
    { id: 20, name: "Anita", type: "NRI" }
];

const groupedView = Object.groupBy(accHolders, user => user.type);
// console.log(groupedView);

////////////////////////////////////////////////////////
// array methods practice

// 1
const totalDepositsInBank = accounts.flatMap(acc => acc.movements).filter(tr => tr > 0).reduce((sum, tr) => sum + tr, 0);
// console.log(totalDepositsInBank);

// 2
const totalNoOfDeposits = accounts.flatMap(acc => acc.movements).filter(tr => tr >= 1000).length;
const totalNoOfDeposits2 = accounts.flatMap(acc => acc.movements).reduce((count, current) => {
    count = current >= 1000 ? ++count : count;
    return count;
}, 0);
// console.log(totalNoOfDeposits);
// console.log(totalNoOfDeposits2);

// 3
const transactions = accounts
    .flatMap(acc => acc.movements)
    .reduce((tr, current) => {
        // if (current > 0) {
        //     tr.sumDeposit += current;
        //     return tr;
        // } else {
        //     tr.sumWithdrawals += Math.abs(current);
        //     return tr;
        // }
        current > 0 ? tr.sumDeposit += current : tr.sumWithdrawals += Math.abs(current);
        return tr;
    }, { sumDeposit: 0, sumWithdrawals: 0 });
// console.log(transactions);

// 4
const str = `what's up my brother ? how you doin ?`;
const str2 = `and then she said she saw the stars and the moon and the clouds.`;
const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

const capitaliseString = str => str.replace(str[0], str[0].toUpperCase());

const titleCased = str => capitaliseString(str.toLowerCase().split(' ')
    .map(word => exceptions
        .includes(word) ? word : capitaliseString(word))
    .join(' '));
// console.log(titleCased(str2));
