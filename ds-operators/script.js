'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starter, mainCourse) {
    return [this.starterMenu[starter], this.mainMenu[mainCourse]];
  },

  // we can destructure arguments sent as an object directly in the functions
  orderDelivery: function ({ starter, main, address, time }) {
    console.log(`Order received for ${this.starterMenu[starter]} and ${this.mainMenu[main]}. Order will be delivered by ${time} to ${address}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`This is your pasta with ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza: function (mainIng, ...otherIngs) {
    console.log(mainIng);
    console.log(otherIngs);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// restaurant.orderDelivery({
//   time: '22.30',
//   address: '36, Blr-73',
//   starter: 2,
//   main: 2
// });

// const ings = [prompt('Make your pasta; Enter ingredient 1 : '), prompt('Enter ingredient 2 : '), prompt('Enter ingredient 3 : ')];
// console.log(ings);
// restaurant.orderPasta(...ings);

// restaurant.orderPizza('Chicken pepperoni', 'chilli flakes', 'jalapeno', 'blueberry');
// restaurant.orderPizza('mushrooms');

const arr = [2, 3, 4, 5];
const [a, b, c] = arr; //assigns the first 3 elements of the array to a, b and c respectively
// console.log(a, b, c);
// console.log(arr);
// the original array is not at all destroyed cause of destructuring. It is only a way to unpack values to individual variables

let [main, , secondary] = restaurant.categories;
// we simply leave a blank space inorder to skip a value

// console.log(main, secondary);

// to swap two variables
// let temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// but to swap using array destructuring
[main, secondary] = [secondary, main];
// console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
// this is how we receive two return values from a function

// console.log(starter, mainCourse);

// destructuring nested arrays
const nested = [1, 2, 3, [4, 5, 6]];
const [i, , , [j, k]] = nested;
// console.log(i, j, k);

// default values
const [m, n = 0, o = 0] = [67, 85];
// here m will be 67, n will be 85 but as there is no third element, o will be initialised with 0 as tht is the default value


// ----------------------------------------------------------------------
const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: ['computer science', 'programming', 'algorithms', 'data structures', 'java', 'math', 'software', 'engineering'],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13
      }
    },
    highlighted: true
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: ['Harold Abelson', 'Gerald Jay Sussman', 'Julie Sussman (Contributor)'],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: ['computer science', 'programming', 'javascript', 'software', 'engineering'],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0
      }
    },
    highlighted: true
  },
  {
    title: 'Computer Systems: A Programmer\'s Perspective',
    author: ['Randal E. Bryant', 'David Richard O\'Hallaron'],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: ['computer science', 'computer systems', 'programming', 'software', 'C', 'engineering'],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16
      }
    },
    highlighted: true
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: ['computer science', 'operating systems', 'programming', 'software', 'C', 'Java', 'engineering'],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65
      }
    }
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6
      }
    },
    highlighted: true
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090
      }
    }
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: ['computer science', 'compilers', 'engineering', 'interpreters', 'software', 'engineering'],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0
      }
    }
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808
      }
    },
    highlighted: true
  }
];

// Destructuring arrays assignments
// 1.1
const [firstBook, secondBook] = books;
// console.log(firstBook, secondBook);

// 1.2
const [, , thirdBook] = books;
// console.log(thirdBook);

// 1.3
const ratings = [['rating', 4.19], ['ratingsCount', 144584]];
const [[, rating], [, ratingsCount]] = ratings;
// console.log(rating, ratingsCount);

// 1.4
const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
// console.log(fiveStarRatings, oneStarRatings, threeStarRatings);

// ---------------------------------------------------------
// destructuring objects
const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// to give property a different name
const { name: restaurantName } = restaurant;
// console.log(restaurantName);


// default values
const { bestselling = [] } = restaurant;
// console.log(bestselling);

// mutating variables
let ab = 100;
let cd = 999;

const testObj = { ab: 25, cd: 45, ef: 76 };

({ ab, cd } = testObj);// we need to wrap the destructuring syntax inside parenthesis in order to reassign different values to variables

// nested objects destructuring
const { fri: { open, close } } = openingHours;
// console.log(open, close);


// -------------------------------------------------------------
// The spread operator

const spreadArr = [12, 34, 23, 45];
const dumbArr = [1, 2, ...spreadArr];
// here ...spreadArr unpacks all the elements in the array spreadArr and writes them individually into dumbArr

// console.log(dumbArr);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
mainMenuCopy.push('masaaldose');
// console.log(mainMenuCopy);

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);


// spread works on all iterables: arrays, strings, maps/sets. BUT NOT OBJECTS (works post ES2018)
// spread on strings
const spreadStr = 'harsh';
// console.log(...spreadStr);

// Objects
const spreadObj = { founder: 'harsh', ...restaurant, foundedIn: 2024 };

spreadObj.name = 'harsh\'s eateries'; //proves that it creates a shallow copy

// console.log(spreadObj);
// console.log(restaurant);


// ----------------------------------------------------
// rest operator

const [first, second, ...others] = [1, 22, 45, 23, 43, 67, 86];
// console.log(first, second, others);

const [food1, food2, ...restMenu] = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(food1, food2, restMenu);
// packs individual elements into an array


// works for objects too
const { sat, ...weekdays } = openingHours;
// console.log(sat, weekdays);

// strings
const [q, w, ...restOfStr] = 'Harsh';
// console.log(q, w, restOfStr);

const addRest = function (...numbers) {
  // console.log(numbers); numbers will be an array
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

// addRest(1, 2, 4, 54, 56);
// addRest(1, 1);
// addRest(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);