'use strict';

//scoping in practice
function calcAge(birthyear) {
    const age = 2024 - birthyear;

    function printAge() {
        let op = `Hey ${fName}, you are ${age} years old, born in ${birthyear}.`;
        //variable op is function scoped
        //here fName is read from the global scope, age from the parent scope and birthyear from the variable environment of the calcAge function's exedution context
        console.log(op);

        if (birthyear >= 1991 && birthyear < 2001) {
            // creating a new variable in the current scope with the same name as the one in the global scope
            const fName = 'shetty';

            op = 'new op';
            // reassigning the variable from the parent scope changes its value across the scope

            const str = `oh.! and you are a millenial ${fName}.!`;
            var isMillenial = true;
            // here str is block scoped
            // fName is looked up from the global scope
            // console.log(str);


            function add(a, b) {
                // console.log(a + b);
                return a + b;
            }
            // calling func add(2,3) is going to work here because functions are block scoped (starting from es6 / only in strict mode) just like variables declared with let and const
        }
        // if i try to log str to the console here or anywhere of the if block, its going to thow a reference error

        // but if i try logging variable isMillenial to the console, it will work as it is function scoped and the scope of this variable is the immediate parent function that wraps it and not any block.

        // but if we call add function here, it will throw a reference error, as the function is block scoped. But if we dont use strict mode, it will still work.
        // functions are block scoped in strict mode
    }

    printAge();

    return age;
}

const fName = 'harsh';
// calcAge(2000);


// --------------------------------
// Hoisting and temporal dead zone

let a = 10;
let b = 10;

// console.log(add()); works


// console.log(add2()); ReferenceError: Cannot access uninitialized variable.
// console.log(add3()); ReferenceError: Cannot access uninitialized variable.

function add() {
    return a + b;
}

const add2 = function () {
    return a + b;
};

const add3 = (a, b) => a + b;

var x = 1;
const y = 2;
let z = 3;

// console.log(x === window.x); //true
// console.log(y === window.y); //false
// console.log(z === window.z); //false

// variables declared with var, creates a property in the window object and the ones declared with let/const doesn't


// -----------------------------------------------------
// The 'this' keyword

//global
// console.log(this); //points to global window object

//simple function
function minus(a, b) {
    // console.log(a - b);
    // console.log(this); //undefined for a normal function
}
minus(50, 20);


// arrow functions
const minusArrow = (a, b) => {
    // console.log(a - b);
    // console.log(this);
    //points to this value of parent scope, here window object
    // arrow functions do not have any this keyword of its own. So it takes the this keyword of its immediate lexical scope
};
minusArrow(60, 39);


//this in object method
const harsh = {
    name: 'harsh',
    birthyear: 2000,
    calcAge: function () {
        this.age = 2024 - this.birthyear;
        // console.log(this);
    }
};
harsh.calcAge();//here it points to the object harsh

const tum = {
    name: 'tum',
    birthyear: 1998,
};
tum.calcAge = harsh.calcAge; //this is called method borrowing. Simply copying the method of one object to another oject

tum.calcAge(); //this points to the object with which we call the method. So here, this points to the object tum


const fInMethod = {
    a: 20,
    b: 3,
    calcDiff: function () {
        this.diff = this.a - this.b;

        // to preserve the value of this for normal function calls
        const self = this;
        const c = function () {
            console.log(this);
            //value of this is undefined as this for any normal function calls is set to undefined

            // console.log(self); This is a pre-ES6 solution
            // this will preserve the value of this by storing it in an extra variable called self here
        };
        c();

        // this is a more modern solution to preserve the value of this. Simply use arrow functions, if ever there is a need for functions inside methods
        const d = () => {
            console.log(this);
            //will have value of this of calcDiff function as it is an arrow function
            // this is 
        };
        d();

    }
};

// fInMethod.calcDiff();


// ---------------------------------------------------------------
// Primitive vs. reference types

// primitive types
let fullname = 'harshith m r';
let oldName = fullname;
fullname = 'harshith shetty';

// console.log('old name: ', oldName);
// console.log('new name: ', fullname);


// reference type
const me = {
    fName: 'harshith',
    lName: 'shetty'
};

const cousin = me;

cousin.fName = 'chandan'; //changes in both me object and in cousin object as they are both pointing to same object in the heap
// console.log('me2 : ', me2);
// console.log('cousin2 : ', cousin2);


// instead, inorder to actually copy objects and not just the reference
const me2 = {
    fName: 'harshith',
    lName: 'shetty',
    friends: ['Akhil', 'Jeevan', 'Mahesh']
};

const cousin2 = Object.assign({}, me2);//creates a shallow copy
cousin2.fName = 'chandan';

cousin2.friends.pop();
cousin2.friends.pop();
cousin2.friends.pop(); //changes in the me2 object too

console.log('me2 : ', me2);
console.log('cousin2 : ', cousin2);

// inorder to deep clone a object, we use an external library like lodash for example which comes with a ton of helpful tools