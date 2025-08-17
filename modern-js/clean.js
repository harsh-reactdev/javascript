const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  //now the object is immutable. Works only for first level. Not for deeper levels of objects 
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;


// This is a pure function now
const addExpense = function (state, limits, value, description, user = 'jonas  ') {
  // if (!user) user = 'jonas'; replaced with default parameters
  const cleanUser = user.toLowerCase();

  // let limit = spendingLimits[user] ? spendingLimits[user] : 0; //OR
  // let limit = spendingLimits?.[user] ?? 0;
  // const limit =  getLimit(user);
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // } // replace with ternary operation


  // if (value <= getLimit(user)) {
  //   budget.push({ value: -value, description, user });
  // }

  return value <= getLimit(limits, cleanUser) ? [...state, { value: -value, description, user: cleanUser }] : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
// console.log(budget);

const checkExpenses = function (state, limits) {
  return state.map((entry) => {
    // let lim;
    // if (spendingLimits[el.user]) {
    //   lim = spendingLimits[el.user];
    // } else {
    //   lim = 0;
    // }

    // let limit = spendingLimits?.[user] ?? 0;
    // const limit = getLimit(user); 
    return entry.value < -getLimit(limits, entry.user) ? { ...entry, flag: 'limit' } : entry;
  });
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

const logBigExpenses = function (state, limit) {
  // let output = '';
  // // for (const entry of budget) {
  // // if (entry.value <= -limit) {
  // state.forEach((entry) => {
  //   output += entry.value <= -limit ? entry.description.slice(-2) + ' / ' : ''; // Emojis are 2 chars
  // });
  // output = output.slice(0, -2); // Remove last '/ '
  // // }

  const bigExpenses = state
    .filter(entry => entry <= -limit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 1000);