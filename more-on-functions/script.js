'use strict';

// DEFAULT PARAMETERS
const bookings = [];

const createBooking = function (flightNum, noOfPsg = 1, price = 3600 * noOfPsg) {
    bookings.push({
        flightNum,
        noOfPsg,
        price
    });
    // console.log(bookings);
};

createBooking('HM716', 2, 6000);

// to skip a last few parameters or last parameter,
createBooking('HG745');

// to skip a parameter in between
createBooking('YG980', undefined, 9800);


// VALUE V/S REFERENCE
const flight = 'JH856';
const harsh = {
    name: 'Harshith Madival Ramesh',
    passportNo: 7654364789
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH534';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passportNo === 7654364789) {
        console.log('Checked in successfully.');
    } else {
        console.log('Passport not identified.');
    }

    // console.log(harsh);
};

// checkIn(flight, harsh);
// console.log(harsh);

//  // HOW OBJECT REFERENCE AFFECTS
const generatePassport = function (person) {
    person.passportNo = Math.trunc(Math.random() * 10000000000);
    // changes the actual object and hence data is being changed and that should not happen
};

// generatePassport(harsh);
// checkIn(flight, harsh);
// console.log(harsh);

// FUNCTIONS ACCEPTING FUNCTIONS (CALLBACK FUNCTIONS) AS ARGUMENT (HIGHER ORDER FUNCTIONS)

const oneWordMaker = function (str) {
    return str.replaceAll(' ', '');
};

const firstWordUpper = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function that accepts a function as an argument.
const transformer = function (str, action) {
    console.log(`Unmodified string : ${str}`);
    console.log(`Modified string : ${action(str)}`);
    console.log(`Function used : ${action.name}`);
};

// transformer('harsh is a pyscopath', oneWordMaker);


// FUNCTIONS RETURNING FUNCTIONS

// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}.!`);
//     };
// };

const greet = (greeting) => name => console.log(`${greeting} ${name}.!`);

const greeterFunc = greet('Helllloooooooo'); //returns a function
// greeterFunc('harsh'); //invoking the returned function
// greet('Heyyyyyyy')('harsh'); //can also be done like this


// --------------------------------------------------------------------------
// CALL AND APPLY METHODS

const airIndia = {
    airline: 'Air India',
    iatacode: 'AI',
    bookings: [],

    book(flightNum, passenger) {
        // console.log(`${passenger} booked a flight in ${this.airline}, with flight code ${this.iatacode}${flightNum}.`);

        this.bookings.push({
            flighNumber: `${this.iatacode}${flightNum}`,
            passenger
        });
    }

};

airIndia.book(982, 'Harshith'); //this keyword points to the object its being called with, so here it is airIndia

// console.log(airIndia.bookings);

const bookTicket = airIndia.book;

const eurowings = {
    airline: 'Euro Wings',
    iatacode: 'EW',
    bookings: [],
    // book: bookTicket
};

// eurowings.book(509, 'kari'); // works just fine and this will point to eurowings object

// call method
bookTicket.call(airIndia, 845, 'Nagu');

// apply method
bookTicket.apply(airIndia, [624, 'muthusaamy iyer']); // arguments as array of arguments


// ------------------------------------------------------------------------------
// BIND METHOD

const bookEuroWings = bookTicket.bind(eurowings);

bookEuroWings(463, 'tummy');


// WITH EVENT LISTENERS

airIndia.planes = 300;
airIndia.buyPlane = function () {
    // console.log(this);

    this.planes++;
    console.log(this.planes);
};

// const bookAI = airIndia.buyPlane.bind(airIndia);
// binds the this keyword to always point to airIndia for the new function it returns
document.querySelector('.buy').addEventListener('click', airIndia.buyPlane.bind(airIndia));


// Partial application (means we can preset parameters)

const addTax = (rate, value) => value + rate * value;

const vatAdder = (value) => value + 0.23 * value;

const addVAT = addTax.bind(null, 0.23);

// same as addTax = (value) => value + value * 0.23;

const taxAdder = function (rate) {
    return function (value) {
        console.log(value + value * rate);
    };
};

const addVat2 = taxAdder(0.23);

// taxAdder(0.2)(100);
// addVat2(100);

// -------------------------------------------------------------
// IIFEs - Immediately invoked function expressions

(function () {
    // console.log('this is an IIFE');
    // function body
})();

// can be an arrow function too
(() => {
    // console.log('this is an IIFE too.!');
    // function body
})();


// -------------------------------------------------------------
// CLOSURES

const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        // console.log(`${++passengerCount} passenger(s).`);
    };
};

const booker = secureBooking();

//even after the execution context for the secureBooking function is removed from the call stack, the returned function stored in booker, will have access to the variable environment of the secure booking function's execution context. This connection is called a closure

booker();
booker();
booker();

// console.dir(booker);

// ex 1
let a;

const b = function () {
    const c = 92;

    a = function () {
        // console.log(c);
    };
};

b();
// while executing b, a is reassigned with a function value and this function value builds up a connection with its lexical variable environment.

a();
// even after b has finished execution, since the connection of function assigned to a with the variable environment of the execution context of function b, calling a will still log the value of c defined inside the function b.
// This is because of the closures property of JS

const d = function () {
    const e = 111;

    a = function () {
        // console.log(e * 2);
    };
};

a(); //still has the variable env of b's execution context
// console.dir(a);

d();
a(); //but now it since the value of a was reassigned with a different function, the closure will be replaced and maintained with the d function 
// console.dir(a);


// example 2
const boardingPassengers = function (n, wait) {
    const perGroup = n / 3;

    // setTimeout will run after 5 seconds and the execution of boarding passengers function will be completed by then. But still function within setTimeout will still have access to its lexical variable environment of its parent exectution context
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers.`);

        console.log(`There are 3 groups of passengers each with ${perGroup} prople in it.`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} minutes.`);
};

const perGroup = 180;
// although perGroup value is present in the outer scope, the function will first look into its closure scope to find the variable. Only if not present, then it will look in the upper scope

// This shows that closures have a higher priority than the scope chain

// boardingPassengers(120, 5);