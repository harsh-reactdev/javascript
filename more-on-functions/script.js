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