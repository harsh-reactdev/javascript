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

// ------------------------------------------------------------

// forEach
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

