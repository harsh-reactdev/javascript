'use strict';

const game = {
    team1: 'Bayern Munich', team2: 'Borrussia Dortmund', players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ], [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
        'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// ------------------------------------------------------------------
// 1
const { scored, odds } = game;

// for (let i = 0; i < scored.length; i++) {
//     // console.log(`Goal ${i} : ${scored[i]}`);
// } //my solution

for (const [i, player] of game.scored.entries()) {
    // console.log(`Goal ${i + 1} : ${player}`);
}

// ------------------------------------------------------------------
// 2
let avgOdds = 0;
const oddsArray = Object.values(odds);
for (const odd of oddsArray) {
    avgOdds += odd;
}
// console.log(avgOdds / oddsArray.length);

// ------------------------------------------------------------------
// 3
const oddsEntries = Object.entries(odds);
// console.log(oddsEntries);

for (const [teamName, odd] of oddsEntries) {
    const actTeamName = teamName === 'x' ? 'draw' : `victory ${game[teamName]}`;
    const outStr = `Odd of ${actTeamName}`;

    // console.log(`${outStr} : ${odd}`);
}

// ------------------------------------------------------------------
// 4

const scores = {};

for (let i = 0; i < scored.length; i++) {
    const scorer = scored[i];
    scores[scorer] = Object.keys(scores).includes(scorer) ? ++scores[scorer] : 1;
}
// console.log(scores);

