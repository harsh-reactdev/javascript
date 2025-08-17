// importing module
import { addToCart } from './shoppingCart.js';

console.log('---- Importing module ----');

addToCart('banana', 10);

////////////////////////////////////////////////////////////////////////////////

// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json();

// console.log(data);

const getLastPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    // console.log(data);
    return { name: data.at(-1).name, email: data.at(-1).email };
};

const lastPost = getLastPost(); //returns a Promise, because all async functions return a promise.
// console.log(lastPost); 

const lastPost2 = await getLastPost(); //using top level await, we can get the result itself
// console.log(lastPost2);
