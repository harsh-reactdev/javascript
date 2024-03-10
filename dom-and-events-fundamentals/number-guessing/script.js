'use strict';

const resultMessage = document.querySelector('.message');
const labelScore = document.querySelector('.score');
const labelHighScore = document.querySelector('.highscore');
const guessedNumber = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const secretNumber = document.querySelector('.number');

const generateRandomNumber = () => Math.trunc((Math.random() * 20) + 1);

let actualNum = generateRandomNumber();
let score = 20;
let highScore = 0;

const initValues = function () {
    changeBg('#222', '15rem');
    secretNumber.textContent = '?';
    actualNum = generateRandomNumber();
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

const changeBg = function (bgCol, sNumWidth) {
    document.querySelector('body').style.backgroundColor = bgCol;
    secretNumber.style.width = sNumWidth;
};

const checkResult = function () {
    if (score > 1) {
        const guessedNum = guessedNumber.value;
        if (guessedNum) {
            const { resultStr, isCorrect } = getResult(guessedNum, actualNum);
            changeResMsg(resultStr);
            if (!isCorrect) {
                updateScore();
            }
            else {
                setHighScore();
                showGuessedNumber();
                changeBg('#60b347', '30rem');
            }
        } else changeResMsg('🚫 Please guess a number.!');
    } else {
        changeResMsg('💀 You lost the game');
        labelScore.textContent = 0;
    };
};

checkButton.addEventListener('click', checkResult);
againButton.addEventListener('click', initValues);

