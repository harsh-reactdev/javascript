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
