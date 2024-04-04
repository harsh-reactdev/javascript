'use strict';

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnser() {
        const answer = prompt(`${this.question}\n${this.options.join('\n')}`);

        if ((answer !== '') && (Number(answer) >= 0 && Number(answer) < 4)) {
            this.answers[Number(answer)]++;

            this.displayResults();
            this.displayResults('string');

            // This wont work as this will be undefined in the function returned by the displayResults method

            // this.displayResults()();
            // this.displayResults('string')();

            // here in order to display the results, we bind the value of this with the poll object to the function returned by displayResults method
            // this.displayResults().call(this);
            //this points to poll object here
            // this.displayResults('string').call(this);
        }

    },

    displayResults(type = 'array') {
        if (type === 'array') {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }

        // console.log(this);
        // return function (answers = this.answers) {
        //     // console.log(this);
        //     if (type === 'array') {
        //         console.log(answers);
        //     } else if (type === 'string') {
        //         console.log(`Poll results are ${answers.join(', ')}`);
        //     }
        // };
    }
};

document.querySelector('.poll').addEventListener('click', poll.registerNewAnser.bind(poll));


const bonus1 = [5, 4, 7];
// const dispArrays = poll.displayResults.bind(null);

// Here we bind the this keyword of displayResults method to the poll object so that the default value for answers will be the value of 'answers' key in the 'poll' object, until overridden with user sent argument value for answers.
// const dispArr = poll.displayResults().bind(poll);
// const dispStr = poll.displayResults('string').bind(poll);

// dispArr(bonus1);
// dispStr(bonus1);

// another simple solution would be to create an object with answers key holding these arrays as values and assign the this keyword with these objects and call the method
// poll.displayResults.call({ answers: bonus1 });
// poll.displayResults.call({ answers: bonus1 }, 'string');




// ------------------------------------------------------------------
// CC 2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/


(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.body.addEventListener('click', function () {
        header.style.color = 'blue';
    });
})();

/* 
As this is an IIFE, it will be immediately executed once and the execution context will get created and deleted out of the call stack once it is done executing. 

But the function we attached to the body stil accesses the header element to change its color to blue whenever we click on the body. But it is a callback. This callback for event listener will be invoked only when we click on the body element. But by then, the IIFE will have finished execution.

Thanks to closures, the callback function for event listener will still hold connection to the variable environment of the execution context of the IIFE in which the header value is present
*/