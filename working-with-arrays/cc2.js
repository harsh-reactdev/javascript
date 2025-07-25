'use strict';

const julia = [3, 5, 2, 12, 7];
const katie = [4, 1, 15, 8, 3];

const checkDogs = function (jDogs, kDogs) {
    const allDogs = [...jDogs.slice(0, -2), ...kDogs];
    // console.log(jDogs.slice(1, -2));
    allDogs.forEach((dAge, ind) => {
        console.log(`Dog ${ind + 1} ${dAge >= 3 ? 'is an adult' : 'is a puppy'} and it is ${dAge} years old.`);
    });
};

const calcAvgHumanAge = function (arr) {
    // const allDogs = [...jDogs.slice(0, -2), ...kDogs];
    const humanAges = arr.map(dAge => dAge <= 2 ? 2 * dAge : 16 + dAge * 4);

    const bigDogs = humanAges.filter(dAge => dAge >= 18);
    // console.log(bigDogs);

    const humanAge = Math.trunc((bigDogs.reduce((prev, curr) => prev + curr)) / bigDogs.length);
    console.log(humanAge);

    // console.log(Math.trunc(humanAge / bigDogs.length));
};
// calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);
// checkDogs(julia, katie);

const calcAvgHumanAge2 = (arr) => {
    const avgHumanAge = arr.map(age => age <= 2 ? age * 2 : 16 + age * 4).filter(age => age >= 18).reduce((prev, curr, i, arr) => prev + curr / arr.length, 0);
    // console.log(avgHumanAge);
};
// calcAvgHumanAge2([5, 2, 4, 1, 15, 8, 3]);
// calcAvgHumanAge2([16, 6, 10, 5, 6, 1, 4]);

///////////////////////////////////////////////////////////////////////////////////
// const inst = {
//     1: 'map',
//     false: 'null'
// };

// console.log(typeof (Object.keys(inst)[1]));
// console.log(inst);