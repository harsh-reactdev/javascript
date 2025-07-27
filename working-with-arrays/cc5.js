'use strict';

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
    { weight: 18, curFood: 244, owners: ['Joe'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
const calcRecFood = ({ weight }) => Math.trunc(weight ** 0.75 * 28) / 1000;

dogs.forEach(dog => {
    dog.recFood = calcRecFood(dog);
});
console.log(dogs);


// 2
const sarahsDog = function () {
    const dog = dogs.find(dog => dog.owners.includes('Sarah'));

    dog.curFood > dog.recFood ?
        console.log(`It is eating too much.`) :
        console.log(`It isn't eating enough.`);
};
// sarahsDog();


// 3
const bigEaters =
    [...new Set(dogs
        .filter((dog) => dog.curFood > (dog.recFood * 1000))
        .flatMap(dog => dog.owners))
    ];
// console.log(bigEaters);

const littleEaters =
    [...new Set(dogs
        .filter((dog) => dog.curFood < (dog.recFood * 1000))
        .flatMap(dog => dog.owners))
    ];
// console.log(littleEaters);


// 4
console.log(`${bigEaters.join(' and ')}'s dogs eat too much.`);
console.log(`${bigEaters.join(' and ')}'s dogs eat too little.`);


// 5
console.log(dogs.filter(dog => (dog.recFood * 1000) === dog.curFood));


// 6
const okayDogs = dogs.every(dog =>
    dog.curFood > (dog.recFood * 0.9) ||
    dog.curFood < (dog.recFood + 1.1));

console.log(okayDogs);


// 7
const okayDogsArr = dogs
    .filter(dog =>
        dog.curFood > (dog.recFood * 0.9) ||
        dog.curFood < (dog.recFood + 1.1))
    .flatMap(dog => dog);

console.log(okayDogsArr);


// 8
const grouped = Object.groupBy(dogs, (dog) => {
    if (dog.curFood < (dog.recFood * 1000)) {
        return 'too-little';
    }

    else if (dog.curFood > (dog.recFood * 1000)) {
        return 'too-much';
    }
    else return 'exact';
});
console.log(grouped);


// 9
const groupedBasedOnOwners = Object.groupBy(dogs, (dog) => {
    return dog.owners.length;
});
console.log(groupedBasedOnOwners);


// 10
const sortedDogs = dogs.toSorted((a, b) => a.recFood - b.recFood);
console.log(sortedDogs);