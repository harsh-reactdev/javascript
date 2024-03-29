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

// Destructuring Objects assignment
// 2.1
// const [{ title, ISBN, author }] = books;
// console.log(title, author, ISBN);

// 2.2
const [{ keywords: tags }] = books;
// console.log(tags);

// 2.3
const { language, programmingLanguage = 'unknown' } = books[6];
// console.log(language, programmingLanguage);

// 2.4
let bookTitle = 'unknown';
let bookAuthor = 'unknown';
// console.log(bookTitle, bookAuthor);
({ title: bookTitle, author: bookAuthor } = books[0]);
// console.log(bookTitle, bookAuthor);

// 2.5
const { thirdParty: { goodreads: { rating: bookRating } } } = books[0];
// console.log(bookRating);

// 2.6
const printBookInfo = function ({ title, author, year = 'Year Unknown' }) {
  console.log(`${title} by ${author}, ${year}`);
};

// printBookInfo({ title: 'Meditations', author: 'Marcus Aurelius' });


// spread operator
// 3.1
const [book1, book2] = books;
const bookAuthors = [...book1.author, ...book2.author];
// console.log(bookAuthors);

// 3.2
const spellWord = function (spreadStr) {
  console.log(...spreadStr);
};

// spellWord('javascript');

// rest patterns
// 4.1 
const { keywords: [mainKeyword, ...rest] } = books[0];
// console.log(mainKeyword, rest);

// 4.2
const { publisher: bookPublisher, ...restOfTheBook } = books[1];
// console.log(bookPublisher, restOfTheBook);

// 4.3
const printBookAuthorsCount = function (title, ...authors) {
  console.log(`The book ${title} has ${authors.length} authors.`);
};
// printBookAuthorsCount('harsh', 'harsh', 'myself');


// -------------------------------------------------------------------
// short circuiting && and ||

// console.log('' || 'harsh'); //returns 'harsh
// console.log(true || 0); //returns true
// console.log(undefined || null); //returns null although null is a falsy value
// console.log(undefined || 0 || '' || 'harsh' || 7 || true);

const noValue = '';
const firstTruthyValue = noValue || 10;
// console.log(firstTruthyValue);

// AND

// console.log('' && 'harsh'); //returns ''
// console.log(true && 0 && 'harsh'); //returns true
// console.log(undefined && null); //returns null although null is a falsy value
// console.log('harsh' && 3 && true && false && 7); //retruns false

// ------------------------------------------------------------------
// Nullish coalescing operator ( ?? )
const nullishA = 0;
let nullishB = nullishA || 10; //assigns first truthy value
// console.log(nullishB);

nullishB = nullishA ?? 10;// assigns the first non nullish value else simply the last value
// console.log(nullishB); 

// ------------------------------------------------------------------
const logObj1 = {
  name: 'hatti kapi',
  numGuests: 0
};

const logObj2 = {
  name: 'CCD',
  owner: 'some guy'
};

// OR assignment operator
// logObj1.numGuests ||= 10;
// logObj2.numGuests ||= 10;

// console.log(logObj1); already has the numGuest value as a truthy value
// console.log(logObj2); assigns value of 10 as numGuests isnt present here;

// nullish assignment operator
// logObj1.numGuests ??= 10; //assigns 10 if numGuests is nullish value
// logObj2.numGuests ??= 10; //assigns 10 if numGuests is nullish value

// console.log(logObj1);
// console.log(logObj2);

// AND assignment
// use to replace a truthy value
logObj1.owner &&= '<Anonymous>';
logObj2.owner &&= '<Anonymous>';
// console.log(logObj1);
// console.log(logObj2);

// ------------------------------------------------------------------
// for of loop

const forOfArr = [1, 2, 4, 4, 5, 6, 6, 7, 0];

for (const item of forOfArr) {
  // if (item === 4) continue;
  // if (item === 6) break;
  // can use break and continue in for of loop
  // console.log(item);
};

// for of loop only gives access to each item of the array. But to get access to the index of the current item :
for (const item of forOfArr.entries()) {
  // console.log(item);
};

for (const [index, item] of forOfArr.entries()) { //can destructure each entry inside the loop syntax too
  // console.log(index, item);
}

// console.log(forOfArr.entries()); //an array iterator, gives back an array of entries in the form of seperate arrays each holding index and value [index, vaue]


// ------------------------------------------------------------------
// Enhanced object literals

const outer = {
  a: 'a',
  b: 'b',
  c: 'c'
};

const mainObj = {
  alpha: 'A-Za-z',

  outer, //here simply the object name will create a property with the same name as the outer object and store its value in it

  orderFood() { //no need to write orderFood : function() { func. body } we can eliminate the function keyword
    console.log('your food has been ordered');
  },

  [`alpha-${outer.a}`]/*we can add any expression inside a square brackets for property names, so it computes values and use it as the property name*/: 'outer a'

};

// ------------------------------------------------------------------
// Optional chaining

//here we check if the outer property exists in the main object and then if it exists we also check if property c exists inside this outer object and only if is true we log the property c on the console, which is not so readable
if (mainObj.outer && mainObj.outer.c) {
  // console.log(mainObj.outer.c);
};

// so, instead of long syntax, use optional chaining
// console.log(mainObj.outer?.a);
// logs a to the console only if a property called outer is present in the object

// console.log(restaurant.openingHours?.fri?.open);
// logs 'open' value to the console only if opening hours is present and only if fri exists on the openingHours property

const outerOrder = mainObj.orderFoo?.() && 'method doesnt exist';
// console.log(mainObj.orderFood?.() ?? 'method doesnt exist');
// here only if  orderFood method exists only then the method will be called


// works on arrays too
const opChArr = ['me', 'tumm', 'sinch', [2, 3, 4]];
// console.log(opChArr?.[3]?.[2]);

//------------------------------------------------------------------
// looping objects

// looping over array of property names (keys) of an object
const numOfOpenDays = Object.keys(openingHours);
let openStr = `We are open on ${numOfOpenDays.length} days : `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day} `;
};

// console.log(openStr);

// looping over array of values of an object
const openVals = Object.values(openingHours);
let openValStr = '';

for (const { open, close } of openVals) {
  openValStr += `Opens at ${open}, closes at ${close}\n`;
}
// console.log(openValStr);

// looping over entries of an object
// const testObj12 = { a: 'a', b: 'b' };
const openEntries = Object.entries(openingHours);
// console.log(openEntries);
let actualOpenStr = '';
for (const [key, { open, close }] of openEntries) {
  // console.log(key, `opens at : ${open}`, `closes at : ${close}`);
  actualOpenStr += `On ${key}, we open at ${open} and close by ${close}.\n`;
}
// console.log(actualOpenStr);

//------------------------------------------------------------------
// Sets

const orderSet = new Set(['pasta', 'pizza', 'risotto', 'pasta', 'pizza']);
// console.log(orderSet); //duplicates wont be present

const strSet = new Set('lupin'); //strings are iterables too
// console.log(strSet);

// check size of set
// console.log(orderSet.size); //returns 3, the no. of all the unique elements present in the set

// check if element is present in set
// console.log(orderSet.has('pizza')); //returns true
// console.log(orderSet.has('banana')); //returns false

// add elements to set
orderSet.add('masaaldose');
// console.log(orderSet);

// delete elements from set
orderSet.delete('pizza');
// console.log(orderSet);

// sets are iterables too, meaning we can loop over them
for (const order of orderSet) {
  // console.log(order);
}

// To create an unique array out of a normal array containing duplicate values
const badArray = ['a', 'b', 'c', 'd', 'a', 'c'];

const goodSet = new Set(badArray);
// console.log(goodSet); //prints a unique set
//removes all duplications from the passed array and creates a set of all unique values

// in order to convert a set to an array, its pretty easy. The spread operator works on all iterables, meaning sets too

const goodArray = [...new Set(goodSet)]; //converts back to array
// console.log(goodArray);


//------------------------------------------------------------------
const restMap = new Map();

restMap.set('1', 'harsh');
restMap.set('2', 'tummu'); //calues can be added 

// or ALSO like this

restMap.set(true, 'orderedIn').set(false, 'we dint have food');

// so,
// console.log(restMap); //will hold all the values added in the previous line

// map.get(key) method, returns the value of the key in the map with which we call the get method
// console.log(restMap.get('1'));
// console.log(restMap.get(false));

const openMap = new Map();
openMap.set('name', 'happycloud coffee').set('open', 11).set('close', 23).set(true, 'We are open').set(false, 'We are closed');
// console.log(openSet);

const time = 11;

// if (time >= openMap.get('open') && time < openMap.get('close')) {
// console.log(openMap.get(true));
// } else console.log(openMap.get(false));
// console.log(openMap.get(time >= openMap.get('open') && time < openMap.get('close')));

const delMapItem = openMap.delete(true); //deletes the item with the specified key and returns true, false if item isn't found in the map
// console.log(delMapItem);

const mapSize = openMap.size;
// console.log(mapSize);

openMap.clear(); //deletes everything in the map
// console.log(openMap);

// using arrays as map keys
const mapKeyArr = ['happy', 'cloud'];

openMap.set(mapKeyArr, 'happycloud');

// console.log(openMap.get(mapKeyArr));
// console.log(openMap);


//------------------------------------------------------------------
// Maps Iteration

const question = new Map([
  ['question', 'Which is the most famous programming language in the world ?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['Correct', 3],
  [true, 'Correct answer.!'],
  [false, 'Try again.!'],
]);

// console.log(question);

// convert objects to maps
const openingHoursMap = Object.entries(openingHours);
// console.log(openingHoursMap);


// console.log(question.get('question'));
// iterating maps
for (const [key, value] of question) {
  // console.log(key, value);
  if (typeof key === 'number') {
    // console.log(`Answer (${key}) : ${value}`);
  }
}
// const answer = Number(prompt('Type your answer : '));
// console.log(answer);
// const isCorrect = answer === question.get('Correct');
// console.log(question.get(answer === question.get('Correct')));

// CONVERT A MAP BACK TO ARRAY
const newQuestionArray = [...question];
// console.log(newQuestionArray);


//------------------------------------------------------------------
// Working with strings
const airline = 'Akasa Air';
const plane = 'A280';

// console.log(plane[0]);
// console.log('B737'[0]); //still works
// console.log(typeof plane[1]); //still a string, but can be converted
// console.log(plane.length); //returns no. of characters in the string

// // indexOf()
// console.log(airline.indexOf('8')); //returns the index of first occurance of the specified character in the string
// console.log(airline.lastIndexOf('A')); //index of last occurance 

// console.log(airline.indexOf('Air')); //returns index of word, if present

// console.log(airline.slice(6)); // returns Air
// console.log(airline.slice(0, 5)); // returns substring from 0th index to 4th index

// console.log(airline.slice(0, airline.indexOf(' '))); //extracting the first word of the string, using the space between words

// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //extracting the last word of the string

// check middle seat
const checkMiddleSeat = function (seat) {
  // seats ending with B and E are middlle seats
  const seatColumn = seat.slice(-1);
  if (seatColumn === 'B' || seatColumn === 'E')
    console.log('You\'ve got the middle seat');
  else console.log('Lucky you.!');
};

// checkMiddleSeat('33B');
// checkMiddleSeat('33E');
// checkMiddleSeat('33C');


//------------------------------------------------------------------
const upper = 'miO teRAki';
const lower = upper.toLowerCase();
const capitalised = lower[0].toUpperCase() + lower.slice(1, lower.indexOf(' ')) + ' ' + lower[lower.indexOf(' ') + 1].toUpperCase() + lower.slice(lower.indexOf(' ') + 2);
// console.log(capitalised);


// replacing
const billInr = 'Rs.8000';
const billUS = billInr.replace('Rs.', '$');
// console.log(billUS);

// can also replace words / substrings
const announcement = 'Bhakthadigalu elliddira, Bhakthadigalu bandu anna prasada abekagi vinanthi';
// console.log(announcement.replace('anna prasada', 'kaayi prasada')); // works like a charm
// console.log(announcement.replaceAll('Bhakthadigalu', 'Devotees')); //replaces all occurances of search string

// console.log(airline.includes('Air')); //returns boolean

// console.log(airline.startsWith('Aka')); //returns boolean

// console.log(airline.endsWith('Air')); //returns boolean

const checkBaggage = function (items) {
  const itemStr = items.toLowerCase();
  if (itemStr.includes('knife') || itemStr.includes('gun')) {
    console.log('Sorry, you can\'t board the plane.');
  } else console.log('Thank you. Please move to the gates.');
};

// checkBaggage('I have some food, my ipad and a gun for my protection.');

// checkBaggage('I have my wallet and my phone.')


// split and join
// console.log('Hello there, young boy.!'.split(' '));
// console.log(['hi', 'harsh'].join(' '));


// capitalise the strings, assuming the strings sent as arguments are a string of names seperated by spaces
const capitaliseNames = function (inpName) {
  console.log(`Input name string : ${inpName}`);
  const names = inpName.split(' ');
  let arrUpper = [];
  for (let name of names) {
    // arrUpper.push(name[0].toUpperCase() + name.slice(1));
    arrUpper.push(name.replace(name[0], name[0].toUpperCase()));
  }
  console.log(`Capitalised string : ${arrUpper.join(' ')}`);
};

// capitaliseNames('harshith shetty');
// capitaliseNames('ramesh madivalaru thimmashetty');
// capitaliseNames('bhagyamma kullappa');
// capitaliseNames('sinchana shetty');


//------------------------------------------------------------------
// padding a string
const greetMe = 'Hey harsh.!';
// console.log(greetMe.padStart(20, '*').padEnd(29, '*'));


// mask credit cards
const maskCreditCards = function (cardNum) {
  const actualNum = String(cardNum);
  let lastNum = actualNum.slice(-4);
  console.log(lastNum.padStart(actualNum.length, '*'));
};

// maskCreditCards('1234567898765432');
// maskCreditCards(17265387461723872);

// console.log('hey '.repeat(5));

// 5.1
const hasExamplesInJava = function (book) {
  const { programmingLanguage } = book;
  return programmingLanguage === 'Java' || 'no data available';
};

// console.log(hasExamplesInJava(books[3]));

// 5.2
for (const book of books) {
  const { onlineContent, title } = book;
  // onlineContent && console.log(`${title} provides online content.`);
}

// 6.1
for (const book of books) {
  const { onlineContent, title } = book;
  // console.log(onlineContent);
  // onlineContent ?? console.log(`${title} provides no data about its online content`);
}

// 7.1 and 7.2
for (let book of books) {
  let { highlighted, thirdParty: { goodreads: { rating } } } = book;
  book.edition || 1;
  highlighted &&= rating < 4.2;
  // console.log(book);
  // console.log(onlineContent);
  // onlineContent ?? console.log(`${title} provides no data about its online content`);
}

// 8
let pageSum = 0;
const allAuthors = [];
for (let { pages, author } of books) {
  pageSum += pages;

  if (typeof author !== 'string') {
    for (const eachAuthor of author) {
      // console.log(eachAuthor);
      allAuthors.push(eachAuthor);
    }
  } else allAuthors.push(author);
}

for (let [index, author] of allAuthors.entries()) {
  // console.log(`${index + 1}. ${author}`);
}

// console.log(allAuthors);


// 9
const bookData = [
  ['title', 'Computer Networking: A Top-Down Approach'],
  ['author', ['James F. Kurose', 'Keith W. Ross']],
  ['publisher', 'Addison Wesley'],
];
const pages = 880;

const newBook = {
  pages,
};

for (let [prop, val] of bookData) {
  newBook[prop] = val;
  // console.log(prop);
}

// console.log(newBook);


// 10 - optional chaining
const getFirstKeyword = function (book) {
  return book.keywords?.[0];
};

const firstKeyword = getFirstKeyword(books[0]);
// console.log(firstKeyword);


// 11 - looping through Objects
const entries = [];

for (const keyName of Object.keys(books[0].thirdParty.goodreads)) {
  entries.push([keyName]);
}

for (const [index, value] of Object.values(books[0].thirdParty.goodreads).entries()) {
  entries[index].push(value);
}

const entries2 = Object.entries(books[0].thirdParty.goodreads);
// console.log(entries);
// console.log(entries2);


// 12 - Sets
const allKeywords = [];

for (const { keywords } of books) {
  allKeywords.push(...keywords); //destructures keywords if its an array and then pushes each of them or simply pushes keywords if not
}

const uniqueKeywords = new Set(allKeywords);
// console.log(uniqueKeywords);
// console.log(allKeywords);

uniqueKeywords.add('coding');
uniqueKeywords.add('science');

uniqueKeywords.delete('business');

// console.log(uniqueKeywords);

const arrayFromSets = [...uniqueKeywords];

uniqueKeywords.clear(); //deletes everything from set

// console.log(uniqueKeywords);


// 13 - Maps
const bookMap = new Map([['title', 'Clean Code'], ['author', 'Robert C. Martin']]);

bookMap.set('pages', 464);

// console.log(`${bookMap.get('title')} by ${bookMap.get('author')}`);

// console.log(bookMap.size); //returns the size of the map

// console.log(`${bookMap.has('author') && 'The author of the book is known'}`);


// 14 - Maps : iteration
const firstBookMap = new Map(Object.entries(books[0]));

for (const [key, val] of firstBookMap) {
  // console.log(key, val);
  if (typeof val === 'number') {
    // console.log(key);
  }
}

// strings - 1
const { ISBN } = books[0];
// console.log(ISBN[6], ISBN[4], ISBN[9], ISBN[8]);

const quote = 'A computer once beat me at chess, but it was no match for me at kick boxing';

// console.log(quote.indexOf('chess'));

// console.log(quote.slice(-6));

const isContributor = function (author) {
  const lower = author.toLowerCase();
  return lower.includes('(contributor)');
};

// console.log(isContributor('harsh)'));

const normalizeAuthorName = function (author) {
  let lower = author.toLowerCase();
  let authorName = '';

  if (isContributor(author)) {
    lower = lower.replace('(contributor)', ' ').trim();
  }
  let lowerArr = lower.split(' ');
  authorName = `${lowerArr[0][0].toUpperCase() + lowerArr[0].slice(1) + ' ' + lowerArr[1][0].toUpperCase() + lowerArr[1].slice(1)}`;

  console.log(authorName);
};

// normalizeAuthorName('hArsHiTH SHetTy (coNTriButor)');