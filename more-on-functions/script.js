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

checkIn(flight, harsh);
// console.log(harsh);

// HOW OBJECT REFERENCE AFFECTS
const generatePassport = function (person) {
    person.passportNo = Math.trunc(Math.random() * 10000000000);
};

generatePassport(harsh);
checkIn(flight, harsh);
// console.log(harsh);