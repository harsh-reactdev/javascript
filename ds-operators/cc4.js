'use strict';

// declarations
const textArea = document.querySelector('.textarea');


// functions
const handleInvalidInput = function () {
    // alert the user that the input contains more than 2 words or less than 2 words and clear the invalid input
    alert('Invalid input. Each word may contain exactly 2 words only.!');
    textArea.value = '';
};

const toCamelCase = function (inputArr) {
    let finalStr = [];

    for (let eachWord of inputArr) {
        // first we will split the underscore cased words into seperate words
        const words = eachWord.split('_');

        const newWord = []; //to store modifed words for each split words array before joining them

        // making sure it works only for two words
        if (words.length === 2) {
            // here we will extract words and also convert them to lower case
            let first = words[0].toLowerCase();
            let second = words[1].toLowerCase();

            // for (let word of words) {
            //     newWord.push(word.replace(word[0], word[0].toUpperCase()));
            // }

            newWord.push(first);
            newWord.push(second.replace(second[0], second[0].toUpperCase()));
            newWord.push(`${' ✅'.repeat(inputArr.indexOf(eachWord) + 1)}`);
        }
        else handleInvalidInput(); //inorder to handle invalid input || more than 2 words input

        // we will join the words after modification and push it to final result array
        finalStr.push(newWord.join(''));
    }

    //join all the words from the final array along with new line seperator and return the final string
    return (finalStr.join('\n'));
};

const handleClick = function () {
    const value = textArea.value;
    const outputString = toCamelCase(value.split('\n'));
    textArea.value = '';
    textArea.value = outputString;
};

// event listener attachment
document.querySelector('.camelCaseHandler').addEventListener('click', handleClick);
// bhagya_kullappa
// ramesh_thimmashetty
// harshith_shetty