'use strict';

// selecting elements to manipulate
// const score0El = document.getElementById('score--0');
// const score1El = document.getElementById('score--1');

const players = [
    document.querySelector('.player--0'), document.querySelector('.player--1')
];

// const currentScore0El = document.getElementById('current--0');
// const currentScore1El = document.getElementById('current--1');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');

const diceImgEL = document.querySelector('.dice');

const playersObj = [
    {
        score: 0,
        currentScore: 0,
        currentScoreEl: document.getElementById('current--0'),
        scoreEl: document.getElementById('score--0')


    },
    {
        score: 0,
        currentScore: 0,
        currentScoreEl: document.getElementById('current--1'),
        scoreEl: document.getElementById('score--1')
    }
];

//global variables
let diceNum;
let currentPlayer = 0;

//hof
const addEventHandler = function (elem, event, callback) {
    elem.addEventListener(event, callback);
};

// initialisation / reset
const init = function () {
    for (let i = 0; i < 2; i++) {
        playersObj[i].currentScoreEl.textContent = 0;
        playersObj[i].scoreEl.textContent = 0;
    }

    diceImgEL.style.display = 'none';

    currentPlayer = 0;
};

//start game
init();

const updateUI = function (element, value) {
    const player = playersObj[currentPlayer];
    player[element].textContent = player[value];
};

const checkWin = function () {
    // if (Number(score0El.textContent) >= 100) {
    //     alert('Player 1 won.!');
    //     init();
    // } else if (Number(score1El.textContent) >= 100) {
    //     alert('Player 2 won.!');
    //     init();
    // }
    if (playersObj[currentPlayer].score >= 100) {
        alert(`Player ${currentPlayer} won.! 🥳`);
        init();
    }
};

const togglePlayer = function () {
    players[currentPlayer].classList.remove('player--active');
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    players[currentPlayer].classList.add('player--active');
};

const clearCurrentScore = function () {
    //     if (currentPlayer === 0) {
    //         currentScore0El.textContent = 0;
    //     } else {
    //         currentScore1El.textContent = 0;
    //     }
    playersObj[currentPlayer].currentScore = 0;
    updateUI('currentScoreEl', 'currentScore');
};

const updateScore = function () {
    // if (currentPlayer === 0) {
    //     currentScore0El.textContent = Number(currentScore0El.textContent) + diceNum;
    // } else {
    //     currentScore1El.textContent = Number(currentScore1El.textContent) + diceNum;
    // }
    playersObj[currentPlayer].currentScore += diceNum;
    updateUI('currentScoreEl', 'currentScore');
};

const handleCurrentScore = function () {
    // currentPlayer.currentScore = diceNum !== 1 ? diceNum : 0;
    if (diceNum !== 1) {
        updateScore();
    }
    else {
        clearCurrentScore();
        togglePlayer();
    }
};

const holdScore = function () {
    // if (currentPlayer === 0) {
    //     score0El.textContent = Number(score0El.textContent) + Number(currentScore0El.textContent);
    //     currentScore0El.textContent = 0;
    // } else {
    //     score1El.textContent = Number(score1El.textContent) + Number(currentScore1El.textContent);
    //     currentScore1El.textContent = 0;
    // }
    playersObj[currentPlayer].score += playersObj[currentPlayer].currentScore;
    updateUI('scoreEl', 'score');
    playersObj[currentPlayer].currentScore = 0;
    updateUI('currentScoreEl', 'currentScore');

    checkWin();
    togglePlayer();

};

//rolling dice
const rollDice = function () {
    diceImgEL.style.display = 'block';
    diceNum = Math.trunc(Math.random() * 6) + 1;
    // diceImgEL.setAttribute('src', `./content/dice-${diceNum}.png`); //another way
    diceImgEL.src = `./content/dice-${diceNum}.png`;

    handleCurrentScore();
};

//Attch event listeners
addEventHandler(newGameBtn, 'click', init);
addEventHandler(rollDiceBtn, 'click', rollDice);
addEventHandler(holdScoreBtn, 'click', holdScore);



