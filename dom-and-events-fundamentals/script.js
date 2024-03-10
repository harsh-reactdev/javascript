'use strict';

const resultMessage = document.querySelector('.message');
const labelScore = document.querySelector('.score');
const labelHighScore = document.querySelector('.highscore');
const guessedNumber = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const secretNumber = document.querySelector('.number');

let actualNum = Math.trunc(Math.random() * 20);
let score = 20;
let highScore = 0;

const initValues = function () {
    // labelHighScore.textContent = score > highScore ? score : highScore;
    secretNumber.textContent = '?';
    actualNum = Math.trunc(Math.random() * 20);
    score = 20;
    resultMessage.textContent = 'Start guessing...';
    guessedNumber.value = '';
    labelScore.textContent = score;

};

const getResult = function (guessedNum, actual) {
    let resultStr = '';
    let isCorrect = false;

    if (guessedNum > actual) resultStr = 'Too high ⬆';
    else if (guessedNum < actual) resultStr = 'Too low ⬇';
    else {
        resultStr = 'Correct Answer 👏🥳';
        isCorrect = true;
    }

    return { resultStr, isCorrect };
};

const changeResMsg = function (resStr) {
    resultMessage.textContent = resStr;
};

const updateScore = function () {
    labelScore.textContent = --score;
};

const setHighScore = function () {
    if (highScore < score) {
        highScore = score;
        labelHighScore.textContent = highScore;
    }
};

const showGuessedNumber = function () {
    secretNumber.textContent = actualNum;
};

const changeBgOnWin = function () {
    // document.body.style('b')
};

const checkResult = function () {
    if (score) {
        const guessedNum = guessedNumber.value;
        // console.log(guessedNum);
        const { resultStr, isCorrect } = getResult(guessedNum, actualNum);
        changeResMsg(resultStr);
        if (!isCorrect) {
            updateScore();
        }
        else {
            setHighScore();
            showGuessedNumber();
            changeBgOnWin();
        }
    } else alert('You lost the game');
};

checkButton.addEventListener('click', checkResult);
againButton.addEventListener('click', initValues);

