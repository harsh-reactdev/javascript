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
// The 'this' keybord