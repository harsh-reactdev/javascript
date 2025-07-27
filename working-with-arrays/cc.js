'use strict';

const printStr = function (age, i) {
    const dogType = age > 3 ? 'an adult' : 'still a puppy';
    console.log(`Dog ${i + 1} is ${dogType} and is ${age} year(s) old`);
};

const checkDogs = function (juliaArr, kateArr) {
    const newArr = [...juliaArr.slice(1, -2), ...kateArr];
    newArr.forEach(printStr);
};

const calcAvgHumanAge = function (dogAges) {
    const humanAges = dogAges.map(dogAge =>
        dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
    );
    // console.log('Average human dog ages : ', humanAges);

    const adultDogs = humanAges.filter(dogAge => dogAge >= 18);
    // console.log('Adult dogs : ', adultDogs);

    const avgHumanAge =
        adultDogs.reduce((sum, dogAge) => sum + dogAge, 0) / adultDogs.length;
    // console.log('Average of human dog ages : ', avgHumanAge);
    // console.log('\n');
};

// calculating average human age by chaining methods
const calcAvgHumanAge2 = dogAges =>
    dogAges
        .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
        .filter(dogAge => dogAge >= 18)
        .reduce(
            (sum, dogAge, i, filteredArr) => sum + dogAge / filteredArr.length,
            0
        );

const juliasDogs = [3, 5, 2, 12, 7];
// const katesDogs = [4, 1, 15, 8, 3];

// const juliasDogs = [9, 16, 6, 8, 3];
const katesDogs = [4, 1, 15, 8, 3];

// checkDogs(juliasDogs, katesDogs);

calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAvgHumanAge2([5, 2, 4, 1, 15, 8, 3]);
calcAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);
