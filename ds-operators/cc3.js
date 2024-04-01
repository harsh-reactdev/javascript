'use strict';

const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

// 1
const events = new Set([...gameEvents.values()]);
// console.log(events);

// 2
gameEvents.delete(64);
// console.log(gameEvents);

// 3
// let minutesDiff = 0;
// let [[prev]] = gameEvents;
// console.log(prev);

// for (const key of gameEvents.keys()) {
//     minutesDiff += (key - prev);
//     prev = key;
// }
// const avrageMins = (minutesDiff / gameEvents.size).toFixed(1);
const averageMins = [...gameEvents.keys()].pop() / gameEvents.size;

console.log(`An event happened, on average, every ${averageMins} minutes`);

// 4
for (const [key, value] of gameEvents) {
    const whichHalf = key < 45 ? 'FIRST HALF' : 'SECOND HALF';
    console.log(`[${whichHalf}] ${key} : ${value}`);
}