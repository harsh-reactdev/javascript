const breeds = [
    {
        breed: 'German Shepherd',
        averageWeight: 32,
        activities: ['fetch', 'swimming'],
    },
    {
        breed: 'Dalmatian',
        averageWeight: 24,
        activities: ['running', 'fetch', 'agility'],
    },
    {
        breed: 'Labrador',
        averageWeight: 28,
        activities: ['swimming', 'fetch'],
    },
    {
        breed: 'Beagle',
        averageWeight: 12,
        activities: ['digging', 'fetch'],
    },
    {
        breed: 'Husky',
        averageWeight: 26,
        activities: ['running', 'agility', 'swimming'],
    },
    {
        breed: 'Bulldog',
        averageWeight: 36,
        activities: ['sleeping'],
    },
    {
        breed: 'Poodle',
        averageWeight: 18,
        activities: ['agility', 'fetch'],
    },
];

// 1
const huskyWeight = breeds.find(dog => dog.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2
const runFetch = breeds.filter(breed => breed.activities.includes('running') && breed.activities.includes('fetch'));
console.log(runFetch);

// 3
const allActivities = breeds.flatMap(breed => breed.activities);
console.log(allActivities);

// 4
const uniqueActivities = new Set(allActivities);
console.log(uniqueActivities);

// 5
breeds.forEach((breed) => {
    if (breed.activities.includes('swimming')) {
        breed.swimmingAdjacent = breed.activities.filter(act => act !== 'swimming');
    }
});
console.log(breeds);

// 6
// breeds.forEach(({ averageWeight }) => console.log(averageWeight >= 10)); //returned true for all 7

// 7
breeds.forEach(({ activities }) => console.log(activities.length >= 3));

// BONUS
const bonusCc = breeds.filter(({ activities }) => activities.includes('fetch')).reduce((acc, { averageWeight }) => Math.max(acc, averageWeight), 0);
console.log(bonusCc);